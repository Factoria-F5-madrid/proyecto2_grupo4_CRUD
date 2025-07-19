from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.routes.user_routes import router as users_router
from backend.routes.service_routes import router as service_router 
from backend.routes.reservation_routes import router as reservations_router

from backend.db.database import AsyncSessionLocal
from backend.models.user_models import User
from backend.models.service_models import Service
from backend.models.reservation_models import Reservation

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "¡Funciona!"}

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(service_router, prefix="/services", tags=["Services"])
app.include_router(reservations_router, prefix="/reservations", tags=["Reservations"])

