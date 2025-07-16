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
