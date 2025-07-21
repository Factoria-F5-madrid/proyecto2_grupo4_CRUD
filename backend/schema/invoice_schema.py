from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal
from backend.models.enums import IncludedServicesEnum

class InvoiceBase(BaseModel):
    service_id: int
    fiscal_number: str
    discounts: bool = False
    additional_price: Optional[Decimal] = None
    vat: Decimal
    included_services: IncludedServicesEnum
    completed: bool = False

class InvoiceCreate(InvoiceBase):
    pass

class InvoiceUpdate(BaseModel):
    service_id: Optional[int] = None
    fiscal_number: Optional[str] = None
    discounts: Optional[bool] = None
    additional_price: Optional[Decimal] = None
    vat: Optional[Decimal] = None
    included_services: Optional[IncludedServicesEnum] = None
    completed: Optional[bool] = None

class InvoiceOut(InvoiceBase):
    invoice_id: int
    payment_id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "invoice_id": 1,
                "service_id": 1,
                "fiscal_number": "FAC-001",
                "discounts": False,
                "additional_price": 50.00,
                "vat": 21.00,
                "included_services": "Basico",
                "completed": False,
                "created_at": "2025-07-21T12:00:00",
                "updated_at": "2025-07-21T12:30:00"
            }
        } 