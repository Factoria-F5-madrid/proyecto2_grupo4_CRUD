from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from backend.schema.service_schemas import ServiceCreate, ServiceOut, ServiceUpdate
from backend.controllers.service_controller import (
    create_service_controller,
    get_all_services_controller,
    get_services_by_user_controller,
    get_service_by_id_controller,
    update_service_controller,
    delete_service_controller
)
from backend.db.database import get_db
from backend.utils.auth_jwt import get_current_user
from backend.models.enums import UserRole

router = APIRouter()  

@router.post("/", response_model=ServiceOut)
async def create_service(service_data: ServiceCreate, db: AsyncSession = Depends(get_db)):
    return await create_service_controller(service_data, db)

@router.get("/", response_model=List[ServiceOut])
async def get_all_services(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Obtiene servicios según el rol del usuario:
    - Admin/Employee: Todos los servicios disponibles
    - User: Solo los servicios que ha contratado
    """
    from backend.logger.logger import logger
    
    logger.info(f"Endpoint /services/ llamado por usuario: {current_user['email']} con rol: {current_user['role']}")
    
    user_role = UserRole(current_user["role"])
    
    if user_role in [UserRole.ADMIN, UserRole.EMPLOYEE]:
        # Admin y Employee ven todos los servicios disponibles
        logger.info("Usuario es Admin/Employee - devolviendo todos los servicios")
        return await get_all_services_controller(db)
    else:
        # Usuario regular solo ve los servicios que ha contratado
        user_id = current_user["user_id"]
        logger.info(f"Usuario regular - buscando servicios para user_id: {user_id}")
        services = await get_services_by_user_controller(user_id, db)
        logger.info(f"Servicios encontrados para usuario {user_id}: {len(services)}")
        return services

@router.get("/{service_id}", response_model=ServiceOut)
async def get_service_by_id(service_id: int, db: AsyncSession = Depends(get_db)):
    return await get_service_by_id_controller(service_id, db)

@router.put("/{service_id}", response_model=ServiceOut)
async def update_service(service_id: int, updated_data: ServiceUpdate, db: AsyncSession = Depends(get_db)):
    return await update_service_controller(service_id, updated_data, db)

@router.delete("/{service_id}")
async def delete_service(service_id: int, db: AsyncSession = Depends(get_db)):
    return await delete_service_controller(service_id, db)
