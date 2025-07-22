from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException

from backend.models.service_models import Service
from backend.schema.service_schemas import ServiceCreate, ServiceUpdate,ServiceOut

from backend.logger.logger import logger


async def create_service_controller(service_data: ServiceCreate, db: AsyncSession):
    logger.debug(f"Creating new service with data: {service_data}")
    new_service = Service(**service_data.dict())
    db.add(new_service)
    await db.commit()
    await db.refresh(new_service)
    logger.info(f"Service created with ID: {new_service.service_id}")
    return new_service


async def get_all_services_controller(db: AsyncSession):
    logger.debug("Fetching all services")
    result = await db.execute(select(Service))
    services = result.scalars().all()
    logger.info(f"Fetched {len(services)} services")
    return services


async def get_service_by_id_controller(service_id: int, db: AsyncSession):
    logger.debug(f"Fetching service by ID: {service_id}")
    result = await db.execute(select(Service).where(Service.service_id == service_id))
    service = result.scalar_one_or_none()
    if service is None:
        logger.warning(f"Service with ID {service_id} not found")
        raise HTTPException(status_code=404, detail="Service not found")
    return service


async def update_service_controller(service_id: int, service_data: ServiceUpdate, db: AsyncSession):
    logger.debug(f"Updating service ID {service_id} with data: {service_data}")
    result = await db.execute(select(Service).where(Service.service_id == service_id))
    service = result.scalar_one_or_none()
    if not service:
        logger.warning(f"Service with ID {service_id} not found for update")
        raise HTTPException(status_code=404, detail="Service not found")
    
    for field, value in service_data.dict(exclude_unset=True).items():
        setattr(service, field, value)

    await db.commit()
    await db.refresh(service)
    logger.info(f"Service ID {service_id} updated successfully")
    return service


async def delete_service_controller(service_id: int, db: AsyncSession):
    logger.debug(f"Deleting service ID: {service_id}")
    result = await db.execute(select(Service).where(Service.service_id == service_id))
    service = result.scalar_one_or_none()
    if not service:
        logger.warning(f"Service with ID {service_id} not found for deletion")
        raise HTTPException(status_code=404, detail="Service not found")
    
    await db.delete(service)
    await db.commit()
    logger.info(f"Service ID {service_id} deleted successfully")
    return {"message": "Service deleted successfully"}

