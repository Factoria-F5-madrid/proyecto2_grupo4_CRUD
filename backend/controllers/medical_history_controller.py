from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models.medical_history_models import MedicalHistory
from backend.schema.medical_history_schema import (
    MedicalHistoryCreate,
    MedicalHistoryUpdate,
)

async def get_all_medical_histories(db: AsyncSession):
    result = await db.execute(select(MedicalHistory))
    return result.scalars().all()

async def get_medical_history_by_id(db: AsyncSession, medical_history_id: int):
    result = await db.execute(select(MedicalHistory).filter(MedicalHistory.id == medical_history_id))
    medical_history = result.scalar_one_or_none()
    if not medical_history:
        raise HTTPException(status_code=404, detail="Medical history not found")
    return medical_history

async def create_medical_history(db: AsyncSession, medical_history: MedicalHistoryCreate):
    db_medical_history = MedicalHistory(**medical_history.dict())
    db.add(db_medical_history)
    await db.commit()
    await db.refresh(db_medical_history)
    return db_medical_history

async def update_medical_history(db: AsyncSession, medical_history_id: int, updates: MedicalHistoryUpdate):
    db_medical_history = await get_medical_history_by_id(db, medical_history_id)
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(db_medical_history, field, value)
    await db.commit()
    await db.refresh(db_medical_history)
    return db_medical_history

async def delete_medical_history(db: AsyncSession, medical_history_id: int):
    db_medical_history = await get_medical_history_by_id(db, medical_history_id)
    await db.delete(db_medical_history)
    await db.commit()
    return {"message": "Medical history deleted successfully"}
