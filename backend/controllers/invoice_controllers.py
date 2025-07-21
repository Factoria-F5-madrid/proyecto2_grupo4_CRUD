from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException

from backend.models.invoice_models import Invoice
from backend.schema.invoice_schema import InvoiceCreate, InvoiceUpdate

async def create_invoice_controller(invoice_data: InvoiceCreate, db: AsyncSession):
    new_invoice = Invoice(**invoice_data.dict())
    db.add(new_invoice)
    await db.commit()
    await db.refresh(new_invoice)
    return new_invoice

async def get_all_invoices_controller(db: AsyncSession):
    result = await db.execute(select(Invoice))
    return result.scalars().all()

async def get_invoice_by_id_controller(invoice_id: int, db: AsyncSession):
    result = await db.execute(select(Invoice).where(Invoice.invoice_id == invoice_id))
    invoice = result.scalar_one_or_none()
    if invoice is None:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

async def update_invoice_controller(invoice_id: int, invoice_data: InvoiceUpdate, db: AsyncSession):
    result = await db.execute(select(Invoice).where(Invoice.invoice_id == invoice_id))
    invoice = result.scalar_one_or_none()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")

    for field, value in invoice_data.dict(exclude_unset=True).items():
        setattr(invoice, field, value)

    await db.commit()
    await db.refresh(invoice)
    return invoice

async def delete_invoice_controller(invoice_id: int, db: AsyncSession):
    result = await db.execute(select(Invoice).where(Invoice.invoice_id == invoice_id))
    invoice = result.scalar_one_or_none()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")

    await db.delete(invoice)
    await db.commit()
    return {"detail": f"Invoice with ID {invoice_id} deleted successfully"} 