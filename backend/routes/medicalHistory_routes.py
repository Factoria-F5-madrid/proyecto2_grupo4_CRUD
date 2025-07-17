from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from backend.db.database import AsyncSessionLocal
from backend.models.medicalHistory_models import MedicalHistory

router = APIRouter(prefix="/medical_history", tags=["MedicalHistory"])

class MedicalHistoryCreate(BaseModel):
    pet_id: int
    type: str
    description: str

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/")
async def get_medical_histories(db: AsyncSession = Depends(get_db)):
    return {"message": "Ruta de historial médico funcionando"}

@router.get("/list")
async def list_medical_histories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MedicalHistory))
    histories = result.scalars().all()
    return histories

@router.post("/")
async def create_medical_history(history: MedicalHistoryCreate, db: AsyncSession = Depends(get_db)):
    new_history = MedicalHistory(
        pet_id=history.pet_id,
        type=history.type,
        description=history.description
    )
    db.add(new_history)
    await db.commit()
    await db.refresh(new_history)
    return new_history