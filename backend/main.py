from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.routes import users_routes,  invoice_routes

from db.database import AsyncSessionLocal
from models.user_models import User

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "¡Funciona!"}

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


app.include_router(users_routes.router, prefix="/users", tags=["Users"])
app.include_router(invoice_routes.router, prefix="/invoices", tags=["Invoices"])