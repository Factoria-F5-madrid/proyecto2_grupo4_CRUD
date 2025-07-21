from sqlalchemy import Column, Integer, Numeric, DateTime, Boolean, Enum, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base_models import Base
from .enums import PaymentMethodEnum, PaymentStatusEnum


class Payment(Base):
    __tablename__ = "Payment"

    payment_id = Column(Integer, primary_key=True, index=True)
    invoice_id = Column(Integer, ForeignKey("Invoice.invoice_id"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    payment_method = Column(Enum(PaymentMethodEnum), nullable=False)
    payment_date = Column(DateTime(timezone=True), nullable=False)
    payment_status = Column(Enum(PaymentStatusEnum), nullable=False)
    refund_processed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

  
    invoice = relationship("Invoice", back_populates="payments")