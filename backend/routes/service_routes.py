from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from backend.schema.service_schemas import ServiceCreate, ServiceOut, ServiceUpdate
from backend.controllers.service_controller import (
    create_service_controller,
    get_all_services_controller,
    get_service_by_id_controller,
    update_service_controller,
    delete_service_controller
)
from backend.db.database import get_db

router = APIRouter()  

@router.post("/", response_model=ServiceOut)
async def create_service(service_data: ServiceCreate, db: AsyncSession = Depends(get_db)):
    return await create_service_controller(service_data, db)

@router.get("/", response_model=List[ServiceOut])
async def get_all_services(db: AsyncSession = Depends(get_db)):
    return await get_all_services_controller(db)

@router.get("/{service_id}", response_model=ServiceOut)
async def get_service_by_id(service_id: int, db: AsyncSession = Depends(get_db)):
    return await get_service_by_id_controller(service_id, db)

@router.put("/{service_id}", response_model=ServiceOut)
async def update_service(service_id: int, updated_data: ServiceUpdate, db: AsyncSession = Depends(get_db)):
    return await update_service_controller(service_id, updated_data, db)

@router.delete("/{service_id}")
async def delete_service(service_id: int, db: AsyncSession = Depends(get_db)):
    return await delete_service_controller(service_id, db)
