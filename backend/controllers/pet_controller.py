from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException
from models.pet_model import Pet
from schema.pet_schema import PetSchema

# empiezo a hacer el GET de pet
async def get_pets(db: AsyncSession):
    result = await db.execute(select(Pet))
    pets = result.scalars().unique().all()
    return pets

# ahora GET por id
async def get_pets_by_id(db: AsyncSession, pet_id: int):
    result = await db.execute(select(Pet).where(Pet.pet_id == pet_id))
    pet = result.scalars().unique().one_or_none()
    if pet is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet

# ahora empiezo con el POst
async def create_pets(db: AsyncSession, pet: PetSchema):
    new_pet = Pet(**pet.model_dump(exclude_unset=True))
    db.add(new_pet)
    await db.commit()
    await db.refresh(new_pet)
    return new_pet

# ahora voy con el PUT para actualizar pet
async def update_pets(db: AsyncSession, pet_id: int, pet: PetSchema):
    result = await db.execute(select(Pet).where(Pet.pet_id == pet_id))
    pet_db = result.scalars().unique().one_or_none()
    if pet_db is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    pet_db.name = pet.name
    pet_db.species = pet.species
    pet_db.breed = pet.breed
    pet_db.birth_date = pet.birth_date
    pet_db.allergies = pet.allergies
    pet_db.special_needs = pet.special_needs
    pet_db.client_id = pet.client_id
    await db.commit()
    await db.refresh(pet_db)
    return pet_db

# ahora voy con el DELETE para borrar pet
async def delete_pets(db: AsyncSession, pet_id: int):
    result = await db.execute(select(Pet).where(Pet.pet_id == pet_id))
    pet_db = result.scalars().unique().one_or_none()
    if pet_db is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    await db.delete(pet_db)
    await db.commit()
    return {"message": "Pet deleted successfully"}
    