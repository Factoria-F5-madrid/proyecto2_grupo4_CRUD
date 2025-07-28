from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.db.database import AsyncSessionLocal
from backend.schema.medical_history_schema import (
    MedicalHistoryCreate,
    MedicalHistoryOut,
    MedicalHistoryUpdate,
)
from backend.controllers.medical_history_controller import (
    create_medical_history,
    get_all_medical_histories,
    get_medical_histories_by_user,
    get_medical_history_by_id,
    update_medical_history,
    delete_medical_history
)
from backend.utils.auth_jwt import get_current_user
from backend.models.enums import UserRole

router = APIRouter()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

@router.get("/", response_model=list[MedicalHistoryOut])
async def get_all(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
   
    user_role = UserRole(current_user["role"])
    
    if user_role in [UserRole.ADMIN, UserRole.EMPLOYEE]:
        
        return await get_all_medical_histories(db)
    else:
   
        user_id = current_user["user_id"]
        return await get_medical_histories_by_user(db, user_id)

@router.get("/{medical_history_id}", response_model=MedicalHistoryOut)
async def get_by_id(medical_history_id: int, db: AsyncSession = Depends(get_db)):
    return await get_medical_history_by_id(db, medical_history_id)

@router.post("/", response_model=MedicalHistoryOut)
async def create(medical_history: MedicalHistoryCreate, db: AsyncSession = Depends(get_db)):
    return await create_medical_history(db, medical_history)

@router.put("/{medical_history_id}", response_model=MedicalHistoryOut)
async def update(medical_history_id: int, updates: MedicalHistoryUpdate, db: AsyncSession = Depends(get_db)):
    return await update_medical_history(db, medical_history_id, updates)

@router.delete("/{medical_history_id}")
async def delete(medical_history_id: int, db: AsyncSession = Depends(get_db)):
    return await delete_medical_history(db, medical_history_id)
