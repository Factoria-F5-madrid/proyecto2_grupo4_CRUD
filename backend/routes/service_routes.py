from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.schema.service_schemas import ServiceCreate, ServiceOut
from backend.models.service_models import Service
from backend.db.database import get_db

router = APIRouter()  

@router.post("/", response_model=ServiceOut)
async def create_service(service_data: ServiceCreate, db: AsyncSession = Depends(get_db)):
    new_service = Service(**service_data.dict())

    db.add(new_service)
    await db.commit()
    await db.refresh(new_service)
    
    return new_service
