from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.exceptions.custom_exceptions import NotFoundException, BadRequestException


from backend.models.payment_models import Payment
from backend.models.invoice_models import Invoice
from backend.schema.payment_schema import PaymentCreate, PaymentUpdate


from backend.logger.logger import logger

async def create_payment_controller(payment_data: PaymentCreate, db: AsyncSession):
    logger.debug(f"Creating payment with data: {payment_data}")
    
    # Verificar que la factura existe
    result = await db.execute(select(Invoice).where(Invoice.invoice_id == payment_data.invoice_id))
    invoice = result.scalar_one_or_none()
    if not invoice:
        logger.error(f"Invoice with ID {payment_data.invoice_id} not found")
        raise BadRequestException(f"Invoice with ID {payment_data.invoice_id} not found")
    
    logger.debug(f"Found invoice: {invoice.invoice_id}")
    
    try:
        new_payment = Payment(**payment_data.dict())
        logger.debug(f"Created payment object: {new_payment}")
        db.add(new_payment)
        await db.commit()
        await db.refresh(new_payment)
        logger.info(f"Payment created with ID: {new_payment.payment_id}")
        return new_payment
    except Exception as e:
        logger.error(f"Error creating payment: {str(e)}")
        await db.rollback()
        raise BadRequestException(f"Error creating payment: {str(e)}")

async def get_all_payments_controller(db: AsyncSession):
    logger.debug("Fetching all payments")
    result = await db.execute(select(Payment))
    payments = result.scalars().all()
    logger.info(f"Fetched {len(payments)} payments")
    return payments

async def get_payment_by_id_controller(payment_id: int, db: AsyncSession):
    logger.debug(f"Fetching payment with ID: {payment_id}")
    result = await db.execute(select(Payment).where(Payment.payment_id == payment_id))
    payment = result.scalar_one_or_none()
    if payment is None:
        logger.warning(f"Payment with ID {payment_id} not found")
        raise NotFoundException("Payment not found")
    logger.info(f"Payment with ID {payment_id} retrieved successfully")    
    return payment

async def update_payment_controller(payment_id: int, payment_data: PaymentUpdate, db: AsyncSession):
    logger.debug(f"Updating payment with ID: {payment_id} using data: {payment_data}")
    result = await db.execute(select(Payment).where(Payment.payment_id == payment_id))
    payment = result.scalar_one_or_none()
    if not payment:
        logger.warning(f"Payment with ID {payment_id} not found for update")
        raise NotFoundException("Payment not found")

    for field, value in payment_data.dict(exclude_unset=True).items():
        setattr(payment, field, value)

    await db.commit()
    await db.refresh(payment)
    logger.info(f"Payment with ID {payment_id} updated successfully")
    return payment

async def delete_payment_controller(payment_id: int, db: AsyncSession):
    logger.debug(f"Deleting payment with ID: {payment_id}")
    result = await db.execute(select(Payment).where(Payment.payment_id == payment_id))
    payment = result.scalar_one_or_none()
    if not payment:
        logger.warning(f"Payment with ID {payment_id} not found for deletion")
        raise NotFoundException("Payment not found")

    await db.delete(payment)
    await db.commit()
    logger.info(f"Payment with ID {payment_id} deleted successfully")
    return {"detail": f"Payment with ID {payment_id} deleted successfully"}