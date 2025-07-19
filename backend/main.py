from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.routes.user_routes import router

from backend.db.database import AsyncSessionLocal
from backend.models.user_models import User

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "¡Funciona!"}

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


app.include_router(router, prefix="/users", tags=["Users"])
