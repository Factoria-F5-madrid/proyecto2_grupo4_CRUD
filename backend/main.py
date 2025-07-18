from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from routes import users_routes, pet_route
from routes import medicalHistory_routes

from db.database import AsyncSessionLocal

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "¡Funciona!"}

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


app.include_router(users_routes.router, prefix="/users", tags=["Users"])
app.include_router(medicalHistory_routes.router, prefix="/medicalHistory", tags=["MedicalHistory"])
app.include_router(pet_route.router, prefix="/pets", tags=["Pets"])
