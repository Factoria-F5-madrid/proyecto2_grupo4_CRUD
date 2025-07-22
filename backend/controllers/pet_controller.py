from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException

from backend.models.pet_models import Pet
from backend.models.user_models import User
from backend.schema.pet_schema import PetCreate, PetUpdate, PetOut

from backend.logger.logger import logger

async def create_pet_controller(pet_data: PetCreate, db: AsyncSession):
    logger.debug(f"Attempting to create pet for user ID {pet_data.user_id}")
    user_result = await db.execute(select(User).where(User.user_id == pet_data.user_id))
    user = user_result.scalar_one_or_none()
    if not user:
        logger.warning(f"User with ID {pet_data.user_id} not found")
        raise HTTPException(status_code=404, detail="User not found")
    
   
    new_pet = Pet(**pet_data.dict())
    db.add(new_pet)
    await db.commit()
    await db.refresh(new_pet)
    logger.info(f"Pet created with ID {new_pet.pet_id}")
    return new_pet

async def get_all_pets_controller(db: AsyncSession):
    logger.debug("Fetching all pets from the database")
    result = await db.execute(select(Pet))
    pets = result.scalars().all()
    logger.info(f"Fetched {len(pets)} pets")
    return pets

async def get_pet_by_id_controller(pet_id: int, db: AsyncSession):
    logger.debug(f"Fetching pet with ID {pet_id}")
    result = await db.execute(select(Pet).where(Pet.pet_id == pet_id))
    pet = result.scalar_one_or_none()
    if pet is None:
        logger.warning(f"Pet with ID {pet_id} not found")
        raise HTTPException(status_code=404, detail="Pet not found")
    logger.info(f"Pet found: ID {pet_id}")    
    return pet

async def get_pets_by_user_controller(user_id: int, db: AsyncSession):
    logger.debug(f"Fetching pets for user ID {user_id}")
    result = await db.execute(select(Pet).where(Pet.user_id == user_id))
    logger.info(f"Found {len(pets)} pets for user ID {user_id}")
    return result.scalars().all()

async def update_pet_controller(pet_id: int, pet_data: PetUpdate, db: AsyncSession):
    logger.debug(f"Attempting to update pet with ID {pet_id}")
    result = await db.execute(select(Pet).where(Pet.pet_id == pet_id))
    pet = result.scalar_one_or_none()
    if not pet:
        logger.warning(f"Pet with ID {pet_id} not found")
        raise HTTPException(status_code=404, detail="Pet not found")
    
   
    if pet_data.user_id is not None:
        logger.debug(f"Validating user ID {pet_data.user_id} for pet update")
        user_result = await db.execute(select(User).where(User.user_id == pet_data.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            logger.warning(f"User with ID {pet_data.user_id} not found")
            raise HTTPException(status_code=404, detail="User not found")
    
  
    for field, value in pet_data.dict(exclude_unset=True).items():
        setattr(pet, field, value)
    
    await db.commit()
    await db.refresh(pet)
    logger.info(f"Pet with ID {pet_id} updated successfully")
    return pet

async def delete_pet_controller(pet_id: int, db: AsyncSession):
    logger.debug(f"Attempting to delete pet with ID {pet_id}")
    result = await db.execute(select(Pet).where(Pet.pet_id == pet_id))
    pet = result.scalar_one_or_none()
    if not pet:
        logger.warning(f"Pet with ID {pet_id} not found")
        raise HTTPException(status_code=404, detail="Pet not found")
    
    await db.delete(pet)
    await db.commit()
    logger.info(f"Pet with ID {pet_id} deleted successfully")
    return {"detail": "Pet deleted successfully"} 