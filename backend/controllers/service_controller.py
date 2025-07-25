from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.exceptions.custom_exceptions import NotFoundException
from backend.utils.cache_decorators import cache_response, invalidate_cache

from backend.models.service_models import Service
from backend.schema.service_schemas import ServiceCreate, ServiceUpdate, ServiceOut

from backend.logger.logger import logger

@invalidate_cache("services")
async def create_service_controller(service_data: ServiceCreate, db: AsyncSession):
    logger.debug(f"Creating service with data: {service_data}")
    new_service = Service(**service_data.dict())
    db.add(new_service)
    await db.commit()
    await db.refresh(new_service)
    logger.info(f"Service created successfully with ID: {new_service.service_id}")
    return new_service

@cache_response("services:all", ttl=600)  # 10 minutos para listas
async def get_all_services_controller(db: AsyncSession):
    logger.debug("Fetching all services")
    result = await db.execute(select(Service))
    services = result.scalars().all()
    logger.info(f"Fetched {len(services)} services")
    return services

@cache_response("services:by_id", ttl=900)  # 15 minutos para servicios individuales
async def get_service_by_id_controller(service_id: int, db: AsyncSession):
    logger.debug(f"Fetching service with ID {service_id}")
    result = await db.execute(select(Service).where(Service.service_id == service_id))
    service = result.scalar_one_or_none()
    if service is None:
        logger.warning(f"Service with ID {service_id} not found")
        raise NotFoundException("Service not found")
    logger.info(f"Service found: ID {service_id}")
    return service

@invalidate_cache("services")
async def update_service_controller(service_id: int, service_data: ServiceUpdate, db: AsyncSession):
    logger.debug(f"Updating service with ID {service_id}")
    result = await db.execute(select(Service).where(Service.service_id == service_id))
    service = result.scalar_one_or_none()
    if not service:
        logger.warning(f"Service with ID {service_id} not found")
        raise NotFoundException("Service not found")
    
    for field, value in service_data.dict(exclude_unset=True).items():
        setattr(service, field, value)
    
    await db.commit()
    await db.refresh(service)
    logger.info(f"Service with ID {service_id} updated successfully")
    return service

@invalidate_cache("services")
async def delete_service_controller(service_id: int, db: AsyncSession):
    logger.debug(f"Deleting service with ID {service_id}")
    result = await db.execute(select(Service).where(Service.service_id == service_id))
    service = result.scalar_one_or_none()
    if not service:
        logger.warning(f"Service with ID {service_id} not found")
        raise NotFoundException("Service not found")
    
    await db.delete(service)
    await db.commit()
    logger.info(f"Service with ID {service_id} deleted successfully")
    return {"detail": "Service deleted successfully"}

