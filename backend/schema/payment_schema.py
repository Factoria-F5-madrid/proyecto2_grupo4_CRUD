from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal
from backend.models.enums import PaymentMethodEnum, PaymentStatusEnum

class PaymentBase(BaseModel):
    invoice_id: int
    amount: Decimal
    payment_method: PaymentMethodEnum
    payment_date: datetime
    payment_status: PaymentStatusEnum
    refund_processed: bool = False

class PaymentCreate(PaymentBase):
    pass

class PaymentUpdate(BaseModel):
    invoice_id: Optional[int] = None
    amount: Optional[Decimal] = None
    payment_method: Optional[PaymentMethodEnum] = None
    payment_date: Optional[datetime] = None
    payment_status: Optional[PaymentStatusEnum] = None
    refund_processed: Optional[bool] = None

class PaymentOut(PaymentBase):
    payment_id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "payment_id": 1,
                "invoice_id": 1,
                "amount": 150.75,
                "payment_method": "credit_card",
                "payment_date": "2025-07-21T14:30:00",
                "payment_status": "completed",
                "refund_processed": False,
                "created_at": "2025-07-20T14:30:00",
                "updated_at": "2025-07-20T15:00:00"
            }
        }