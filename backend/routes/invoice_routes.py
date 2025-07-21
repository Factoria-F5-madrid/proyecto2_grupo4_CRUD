from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from backend.schema.invoice_schema import InvoiceCreate, InvoiceOut, InvoiceUpdate
from backend.controllers.invoice_controllers import (
    create_invoice_controller,
    get_all_invoices_controller,
    get_invoice_by_id_controller,
    update_invoice_controller,
    delete_invoice_controller,
)
from backend.db.database import get_db

router = APIRouter()

@router.post("/", response_model=InvoiceOut)
async def create_invoice(invoice_data: InvoiceCreate, db: AsyncSession = Depends(get_db)):
    return await create_invoice_controller(invoice_data, db)

@router.get("/", response_model=List[InvoiceOut])
async def get_all_invoices(db: AsyncSession = Depends(get_db)):
    return await get_all_invoices_controller(db)

@router.get("/{invoice_id}", response_model=InvoiceOut)
async def get_invoice_by_id(invoice_id: int, db: AsyncSession = Depends(get_db)):
    invoice = await get_invoice_by_id_controller(invoice_id, db)
    if invoice is None:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

@router.put("/{invoice_id}", response_model=InvoiceOut)
async def update_invoice(invoice_id: int, invoice_data: InvoiceUpdate, db: AsyncSession = Depends(get_db)):
    updated_invoice = await update_invoice_controller(invoice_id, invoice_data, db)
    if updated_invoice is None:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return updated_invoice

@router.delete("/{invoice_id}")
async def delete_invoice(invoice_id: int, db: AsyncSession = Depends(get_db)):
    result = await delete_invoice_controller(invoice_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return result 