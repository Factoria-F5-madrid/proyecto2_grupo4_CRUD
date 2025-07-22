from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from backend.schema.payment_schema import PaymentCreate, PaymentOut, PaymentUpdate
from backend.controllers.payment_controllers import (
    create_payment_controller,
    get_all_payments_controller,
    get_payment_by_id_controller,
    update_payment_controller,
    delete_payment_controller,
)
from backend.db.database import get_db

router = APIRouter()

@router.post("/", response_model=PaymentOut)
async def create_payment(payment_data: PaymentCreate, db: AsyncSession = Depends(get_db)):
    return await create_payment_controller(payment_data, db)

@router.get("/", response_model=List[PaymentOut])
async def get_all_payments(db: AsyncSession = Depends(get_db)):
    return await get_all_payments_controller(db)

@router.get("/{payment_id}", response_model=PaymentOut)
async def get_payment_by_id(payment_id: int, db: AsyncSession = Depends(get_db)):
    payment = await get_payment_by_id_controller(payment_id, db)
    if payment is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

@router.put("/{payment_id}", response_model=PaymentOut)
async def update_payment(payment_id: int, payment_data: PaymentUpdate, db: AsyncSession = Depends(get_db)):
    updated_payment = await update_payment_controller(payment_id, payment_data, db)
    if updated_payment is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    return updated_payment

@router.delete("/{payment_id}")
async def delete_payment(payment_id: int, db: AsyncSession = Depends(get_db)):
    result = await delete_payment_controller(payment_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Payment not found")
    return result