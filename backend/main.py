from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.routes import users_routes
from backend.routes import service_routes


from backend.db.database import AsyncSessionLocal
from backend.models.user_models import User
from backend.models.service_models import Service

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "¡Funciona!"}

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


app.include_router(users_routes.router, prefix="/users", tags=["Users"])
app.include_router(service_routes.router, prefix="/services", tags=["Services"])

