from backend.exceptions.custom_exceptions import NotFoundException, BadRequestException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models.medical_history_models import MedicalHistory
from backend.schema.medical_history_schema import (
    MedicalHistoryCreate,
    MedicalHistoryUpdate,
)

from backend.logger.logger import logger


async def create_medical_history(db: AsyncSession, medical_history: MedicalHistoryCreate):
    logger.info(f"Creating new medical history for pet ID {medical_history.pet_id}")
    db_medical_history = MedicalHistory(**medical_history.dict())
    db.add(db_medical_history)
    await db.commit()
    await db.refresh(db_medical_history)
    logger.info(f"Created medical history with ID {db_medical_history.id}")
    return db_medical_history

async def get_all_medical_histories(db: AsyncSession):
    logger.info("Fetching all medical histories")
    result = await db.execute(select(MedicalHistory))
    histories = result.scalars().all()
    logger.info(f"Fetched {len(histories)} medical histories")
    return histories

async def get_medical_history_by_id(db: AsyncSession, medical_history_id: int):
    logger.info(f"Fetching medical history with ID {medical_history_id}")
    result = await db.execute(select(MedicalHistory).filter(MedicalHistory.id == medical_history_id))
    medical_history = result.scalar_one_or_none()
    if not medical_history:
        logger.warning(f"Medical history with ID {medical_history_id} not found")
        raise NotFoundException("Medical history not found")
    logger.info(f"Found medical history with ID {medical_history_id}")    
    return medical_history

async def update_medical_history(db: AsyncSession, medical_history_id: int, updates: MedicalHistoryUpdate):
    logger.info(f"Updating medical history with ID {medical_history_id}")
    db_medical_history = await get_medical_history_by_id(db, medical_history_id)
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(db_medical_history, field, value)
    await db.commit()
    await db.refresh(db_medical_history)
    logger.info(f"Updated medical history with ID {medical_history_id}")
    return db_medical_history

async def delete_medical_history(db: AsyncSession, medical_history_id: int):
    logger.info(f"Deleting medical history with ID {medical_history_id}")
    db_medical_history = await get_medical_history_by_id(db, medical_history_id)
    await db.delete(db_medical_history)
    await db.commit()
    logger.info(f"Deleted medical history with ID {medical_history_id}")
    return {"message": "Medical history deleted successfully"}
