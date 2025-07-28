from typing import Optional, Union
from pydantic import BaseModel, validator
from datetime import datetime
from decimal import Decimal
from backend.models.enums import PaymentMethodEnum, PaymentStatusEnum

class PaymentBase(BaseModel):
    invoice_id: int
    amount: Decimal
    payment_method: Union[PaymentMethodEnum, str]
    payment_date: datetime
    payment_status: Union[PaymentStatusEnum, str]
    refund_processed: bool = False

    @validator('payment_method', pre=True)
    def validate_payment_method(cls, v):
        if isinstance(v, str):
            
            payment_method_mapping = {
                "Efectivo": PaymentMethodEnum.EFECTIVO,
                "Tarjeta de Crédito": PaymentMethodEnum.TARJETA_CREDITO,
                "Tarjeta de Débito": PaymentMethodEnum.TARJETA_DEBITO,
                "Transferencia": PaymentMethodEnum.TRANSFERENCIA,
                "Bizum": PaymentMethodEnum.BIZUM,
                "PayPal": PaymentMethodEnum.PAYPAL
            }
            return payment_method_mapping.get(v, v)
        return v

    @validator('payment_status', pre=True)
    def validate_payment_status(cls, v):
        if isinstance(v, str):
            
            payment_status_mapping = {
                "Pendiente": PaymentStatusEnum.PENDIENTE,
                "Completado": PaymentStatusEnum.COMPLETADO,
                "Fallido": PaymentStatusEnum.FALLIDO,
                "Cancelado": PaymentStatusEnum.CANCELADO,
                "Reembolsado": PaymentStatusEnum.REEMBOLSADO
            }
            return payment_status_mapping.get(v, v)
        return v

class PaymentCreate(PaymentBase):
    pass

class PaymentUpdate(BaseModel):
    invoice_id: Optional[int] = None
    amount: Optional[Decimal] = None
    payment_method: Optional[Union[PaymentMethodEnum, str]] = None
    payment_date: Optional[datetime] = None
    payment_status: Optional[Union[PaymentStatusEnum, str]] = None
    refund_processed: Optional[bool] = None

    @validator('payment_method', pre=True)
    def validate_payment_method(cls, v):
        if isinstance(v, str):
            
            payment_method_mapping = {
                "Efectivo": PaymentMethodEnum.EFECTIVO,
                "Tarjeta de Crédito": PaymentMethodEnum.TARJETA_CREDITO,
                "Tarjeta de Débito": PaymentMethodEnum.TARJETA_DEBITO,
                "Transferencia": PaymentMethodEnum.TRANSFERENCIA,
                "Bizum": PaymentMethodEnum.BIZUM,
                "PayPal": PaymentMethodEnum.PAYPAL
            }
            return payment_method_mapping.get(v, v)
        return v

    @validator('payment_status', pre=True)
    def validate_payment_status(cls, v):
        if isinstance(v, str):
         
            payment_status_mapping = {
                "Pendiente": PaymentStatusEnum.PENDIENTE,
                "Completado": PaymentStatusEnum.COMPLETADO,
                "Fallido": PaymentStatusEnum.FALLIDO,
                "Cancelado": PaymentStatusEnum.CANCELADO,
                "Reembolsado": PaymentStatusEnum.REEMBOLSADO
            }
            return payment_status_mapping.get(v, v)
        return v

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
                "payment_method": "Efectivo",
                "payment_date": "2025-07-21T14:30:00",
                "payment_status": "Pendiente",
                "refund_processed": False,
                "created_at": "2025-07-20T14:30:00",
                "updated_at": "2025-07-20T15:00:00"
            }
        }