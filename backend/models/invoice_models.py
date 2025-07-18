from sqlalchemy import (
    Column,
    Integer,
    Boolean,
    Numeric,
    TIMESTAMP,
    ForeignKey,
    func
)
from sqlalchemy.orm import relationship
from .base_models import Base
from .enums import SqlIncludedServiceEnum


class Invoice(Base):
    __tablename__ = "Invoice"

    invoice_id = Column(Integer, primary_key=True, nullable=False)
    service_id = Column(Integer, ForeignKey("Service.service_id"), nullable=False)
    payment_id = Column(Integer, ForeignKey("Payment.payment_id"), nullable=False)
    tax_identification_number = Column(Integer, nullable=False)  
    discounts = Column(Boolean, nullable=False, server_default="false")
    additional_price = Column(Numeric(10, 2), nullable=False, server_default="0.00")
    vat = Column(Numeric(8, 2), nullable=False, server_default="0.00")
    included_service = Column(SqlIncludedServiceEnum, nullable=False, server_default="Hospedaje")
    completed = Column(Boolean, nullable=False, server_default="false")
    created_at = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())

    
    service = relationship("Service", back_populates="invoices")
    payment = relationship("Payment", back_populates="invoices")
