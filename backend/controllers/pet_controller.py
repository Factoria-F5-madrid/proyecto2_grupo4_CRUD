from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException

from backend.models.pet_models import Pet
from backend.models.user_models import User
from backend.schema.pet_schema import PetCreate, PetUpdate, PetOut

async def create_pet_controller(pet_data: PetCreate, db: AsyncSession):
   
    user_result = await db.execute(select(User).where(User.user_id == pet_data.user_id))
    user = user_result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
   
    new_pet = Pet(**pet_data.dict())
    db.add(new_pet)
    await db.commit()
    await db.refresh(new_pet)
    return new_pet

async def get_all_pets_controller(db: AsyncSession):
    result = await db.execute(select(Pet))
    return result.scalars().all()

async def get_pet_by_id_controller(pet_id: int, db: AsyncSession):
    result = await db.execute(select(Pet).where(Pet.pet_id == pet_id))
    pet = result.scalar_one_or_none()
    if pet is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet

async def get_pets_by_user_controller(user_id: int, db: AsyncSession):
    result = await db.execute(select(Pet).where(Pet.user_id == user_id))
    return result.scalars().all()

async def update_pet_controller(pet_id: int, pet_data: PetUpdate, db: AsyncSession):
    result = await db.execute(select(Pet).where(Pet.pet_id == pet_id))
    pet = result.scalar_one_or_none()
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    
   
    if pet_data.user_id is not None:
        user_result = await db.execute(select(User).where(User.user_id == pet_data.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
    
  
    for field, value in pet_data.dict(exclude_unset=True).items():
        setattr(pet, field, value)
    
    await db.commit()
    await db.refresh(pet)
    return pet

async def delete_pet_controller(pet_id: int, db: AsyncSession):
    result = await db.execute(select(Pet).where(Pet.pet_id == pet_id))
    pet = result.scalar_one_or_none()
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    
    await db.delete(pet)
    await db.commit()
    return {"detail": "Pet deleted successfully"} 