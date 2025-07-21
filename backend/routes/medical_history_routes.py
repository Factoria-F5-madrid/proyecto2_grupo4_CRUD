from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.db.database import AsyncSessionLocal
from backend.schema.medical_history_schema import (
    MedicalHistoryCreate,
    MedicalHistoryOut,
    MedicalHistoryUpdate,
)
from backend.controllers import medical_history_controller

router = APIRouter()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

@router.get("/", response_model=list[MedicalHistoryOut])
async def get_all(db: AsyncSession = Depends(get_db)):
    return await medical_history_controller.get_all_medical_histories(db)

@router.get("/{medical_history_id}", response_model=MedicalHistoryOut)
async def get_by_id(medical_history_id: int, db: AsyncSession = Depends(get_db)):
    return await medical_history_controller.get_medical_history_by_id(db, medical_history_id)

@router.post("/", response_model=MedicalHistoryOut)
async def create(medical_history: MedicalHistoryCreate, db: AsyncSession = Depends(get_db)):
    return await medical_history_controller.create_medical_history(db, medical_history)

@router.put("/{medical_history_id}", response_model=MedicalHistoryOut)
async def update(medical_history_id: int, updates: MedicalHistoryUpdate, db: AsyncSession = Depends(get_db)):
    return await medical_history_controller.update_medical_history(db, medical_history_id, updates)

@router.delete("/{medical_history_id}")
async def delete(medical_history_id: int, db: AsyncSession = Depends(get_db)):
    return await medical_history_controller.delete_medical_history(db, medical_history_id)
