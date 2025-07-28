from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.exceptions.custom_exceptions import NotFoundException, BadRequestException

from backend.models.invoice_models import Invoice
from backend.models.reservation_models import Reservation
from backend.schema.invoice_schema import InvoiceCreate, InvoiceUpdate

from backend.logger.logger import logger

async def create_invoice_controller(invoice_data: InvoiceCreate, db: AsyncSession):
    logger.info(f"Creating invoice with data: {invoice_data.dict()}")
    new_invoice = Invoice(**invoice_data.dict())
    db.add(new_invoice)
    await db.commit()
    await db.refresh(new_invoice)
    logger.info(f"Invoice created with ID: {new_invoice.invoice_id}")
    return new_invoice

async def get_all_invoices_controller(db: AsyncSession):
    logger.info("Fetching all invoices")
    result = await db.execute(select(Invoice))
    invoices = result.scalars().all()
    logger.info(f"Fetched {len(invoices)} invoices")
    return invoices

async def get_invoices_by_user_controller(user_id: int, db: AsyncSession):
    """
    Obtiene todas las facturas de los servicios que un usuario ha contratado a través de sus reservas
    """
    logger.info(f"Fetching invoices for user ID {user_id}")
    

    result = await db.execute(
        select(Invoice)
        .join(Reservation, Invoice.service_id == Reservation.service_id)
        .where(Reservation.user_id == user_id)
        .distinct()
    )
    invoices = result.scalars().all()
    
    logger.info(f"Fetched {len(invoices)} unique invoices for user ID {user_id}")
    return invoices

async def get_invoice_by_id_controller(invoice_id: int, db: AsyncSession):
    logger.info(f"Fetching invoice with ID: {invoice_id}")
    result = await db.execute(select(Invoice).where(Invoice.invoice_id == invoice_id))
    invoice = result.scalar_one_or_none()
    if invoice is None:
        logger.warning(f"Invoice with ID {invoice_id} not found")
        raise NotFoundException("Invoice not found")
    logger.info(f"Found invoice with ID: {invoice_id}")    
    return invoice

async def update_invoice_controller(invoice_id: int, invoice_data: InvoiceUpdate, db: AsyncSession):
    logger.info(f"Updating invoice with ID: {invoice_id}")
    result = await db.execute(select(Invoice).where(Invoice.invoice_id == invoice_id))
    invoice = result.scalar_one_or_none()
    if not invoice:
        logger.warning(f"Invoice with ID {invoice_id} not found for update")
        raise NotFoundException("Invoice not found")

    for field, value in invoice_data.dict(exclude_unset=True).items():
        setattr(invoice, field, value)

    await db.commit()
    await db.refresh(invoice)
    logger.info(f"Invoice with ID {invoice_id} updated successfully")
    return invoice

async def delete_invoice_controller(invoice_id: int, db: AsyncSession):
    logger.info(f"Deleting invoice with ID: {invoice_id}")
    result = await db.execute(select(Invoice).where(Invoice.invoice_id == invoice_id))
    invoice = result.scalar_one_or_none()
    if not invoice:
        logger.warning(f"Invoice with ID {invoice_id} not found for deletion")
        raise NotFoundException("Invoice not found")

    await db.delete(invoice)
    await db.commit()
    logger.info(f"Invoice with ID {invoice_id} deleted successfully")
    return {"detail": f"Invoice with ID {invoice_id} deleted successfully"} 