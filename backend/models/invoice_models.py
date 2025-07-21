from sqlalchemy import Column, Integer, String, Numeric, Boolean, Enum, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base_models import Base
from .enums import IncludedServicesEnum


class Invoice(Base):
    __tablename__ = "Invoice"

    invoice_id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey("Service.service_id"), nullable=False)
    fiscal_number = Column(String(50), nullable=False)
    discounts = Column(Boolean, default=False)
    additional_price = Column(Numeric(10, 2), nullable=True)
    vat = Column(Numeric(5, 2), nullable=False)
    included_services = Column(Enum(IncludedServicesEnum), nullable=False)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

  
    service = relationship("Service", back_populates="invoices")
    payments = relationship("Payment", back_populates="invoice")