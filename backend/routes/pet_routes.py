from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from backend.schema.pet_schema import PetCreate, PetOut, PetUpdate
from backend.controllers.pet_controller import (
    create_pet_controller,
    get_all_pets_controller,
    get_pet_by_id_controller,
    get_pets_by_user_controller,
    update_pet_controller,
    delete_pet_controller,
)
from backend.db.database import get_db

router = APIRouter()

@router.post("/", response_model=PetOut)
async def create_pet(pet_data: PetCreate, db: AsyncSession = Depends(get_db)):
    return await create_pet_controller(pet_data, db)

@router.get("/", response_model=List[PetOut])
async def get_all_pets(db: AsyncSession = Depends(get_db)):
    return await get_all_pets_controller(db)

@router.get("/{pet_id}", response_model=PetOut)
async def get_pet_by_id(pet_id: int, db: AsyncSession = Depends(get_db)):
    pet = await get_pet_by_id_controller(pet_id, db)
    if pet is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet

@router.get("/user/{user_id}", response_model=List[PetOut])
async def get_pets_by_user(user_id: int, db: AsyncSession = Depends(get_db)):
    return await get_pets_by_user_controller(user_id, db)

@router.put("/{pet_id}", response_model=PetOut)
async def update_pet(pet_id: int, pet_data: PetUpdate, db: AsyncSession = Depends(get_db)):
    updated_pet = await update_pet_controller(pet_id, pet_data, db)
    if updated_pet is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    return updated_pet

@router.delete("/{pet_id}")
async def delete_pet(pet_id: int, db: AsyncSession = Depends(get_db)):
    result = await delete_pet_controller(pet_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Pet not found")
    return {"detail": f"Pet with ID {pet_id} deleted successfully"} 