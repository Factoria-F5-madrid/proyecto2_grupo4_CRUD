from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db.database import AsyncSessionLocal
from backend.controllers import pet_controller
from backend.schema.pet_schema import PetSchema

router = APIRouter()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/")
async def get_pets(db: AsyncSession = Depends(get_db)):
    return await pet_controller.get_pets(db)

#ahora hacer un get por id

@router.get("/{id}")
async def get_pets(db: AsyncSession = Depends(get_db)):
     return await pet_controller.get_pets_by_id(db, pet_id=id)

@router.post("/")
async def create_pets(db: AsyncSession = Depends(get_db)):
    return await pet_controller.create_pets(db, pet=PetSchema())

@router.put("/")
async def update_pets(db: AsyncSession = Depends(get_db)):
    return await pet_controller.update_pets(db, pet_id=id, pet=PetSchema())

@router.delete("/")
async def delete_pets(db: AsyncSession = Depends(get_db)):
    return await pet_controller.delete_pets(db, pet_id=id)

