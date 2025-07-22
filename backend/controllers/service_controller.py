from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException

from backend.models.service_models import Service
from backend.schema.service_schemas import ServiceCreate, ServiceUpdate,ServiceOut


async def create_service_controller(service_data: ServiceCreate, db: AsyncSession):
    new_service = Service(**service_data.dict())
    db.add(new_service)
    await db.commit()
    await db.refresh(new_service)
    return new_service


async def get_all_services_controller(db: AsyncSession):
    result = await db.execute(select(Service))
    return result.scalars().all()


async def get_service_by_id_controller(service_id: int, db: AsyncSession):
    result = await db.execute(select(Service).where(Service.service_id == service_id))
    service = result.scalar_one_or_none()
    if service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return service


async def update_service_controller(service_id: int, service_data: ServiceUpdate, db: AsyncSession):
    result = await db.execute(select(Service).where(Service.service_id == service_id))
    service = result.scalar_one_or_none()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    for field, value in service_data.dict(exclude_unset=True).items():
        setattr(service, field, value)

    await db.commit()
    await db.refresh(service)
    return service


async def delete_service_controller(service_id: int, db: AsyncSession):
    result = await db.execute(select(Service).where(Service.service_id == service_id))
    service = result.scalar_one_or_none()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    await db.delete(service)
    await db.commit()
    return {"message": "Service deleted successfully"}

