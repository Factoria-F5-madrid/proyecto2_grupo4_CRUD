from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.db.database import AsyncSessionLocal

router = APIRouter(prefix="/invoices", tags=["Invoices"])

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/")
async def get_invoices(db: AsyncSession = Depends(get_db)):
    return {"message": "Ruta de facturas funcionando"}