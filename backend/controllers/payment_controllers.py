from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException

from backend.models.payment_models import Payment
from backend.schema.payment_schema import PaymentCreate, PaymentUpdate

async def create_payment_controller(payment_data: PaymentCreate, db: AsyncSession):
    new_payment = Payment(**payment_data.dict())
    db.add(new_payment)
    await db.commit()
    await db.refresh(new_payment)
    return new_payment

async def get_all_payments_controller(db: AsyncSession):
    result = await db.execute(select(Payment))
    return result.scalars().all()

async def get_payment_by_id_controller(payment_id: int, db: AsyncSession):
    result = await db.execute(select(Payment).where(Payment.payment_id == payment_id))
    payment = result.scalar_one_or_none()
    if payment is None:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

async def update_payment_controller(payment_id: int, payment_data: PaymentUpdate, db: AsyncSession):
    result = await db.execute(select(Payment).where(Payment.payment_id == payment_id))
    payment = result.scalar_one_or_none()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    for field, value in payment_data.dict(exclude_unset=True).items():
        setattr(payment, field, value)

    await db.commit()
    await db.refresh(payment)
    return payment

async def delete_payment_controller(payment_id: int, db: AsyncSession):
    result = await db.execute(select(Payment).where(Payment.payment_id == payment_id))
    payment = result.scalar_one_or_none()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    await db.delete(payment)
    await db.commit()
    return {"detail": f"Payment with ID {payment_id} deleted successfully"}