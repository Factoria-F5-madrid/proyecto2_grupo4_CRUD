from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db.database import AsyncSessionLocal

router = APIRouter()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/")
async def get_pets(db: AsyncSession = Depends(get_db)):
    return {"message": "Ruta de mascotas funcionando"}

#ahora hacer un get por id

@router.get("/{id}")
async def get_pets(db: AsyncSession = Depends(get_db)):
    return {"message": "Ruta de mascotas funcionando"}

@router.post("/")
async def create_pets(db: AsyncSession = Depends(get_db)):
    return {"message": "Ruta de mascotas funcionando"}

@router.put("/")
async def update_pets(db: AsyncSession = Depends(get_db)):
    return {"message": "Ruta de mascotas funcionando"}

@router.delete("/")
async def delete_pets(db: AsyncSession = Depends(get_db)):
    return {"message": "Ruta de mascotas funcionando"}

