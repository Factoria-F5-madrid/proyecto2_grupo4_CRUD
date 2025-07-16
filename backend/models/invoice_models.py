from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Numeric,
    CheckConstraint,
    Index,
    ForeignKey  
)
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Invoice(Base):
    __tablename__ = "invoices"

    invoice_id = Column(Integer, primary_key=True, nullable=False)
    service_id = Column(Integer, ForeignKey('services.service_id'), nullable=False)
    payment_id = Column(Integer, ForeignKey('payments.payment_id'), nullable=False)
    tax_identification_number = Column(String(255), nullable=False)
    discounts = Column(Boolean, nullable=False, default=False)
    additional_price = Column(Numeric(10, 2), nullable=False, default=0.00)
    VAT = Column(Numeric(8, 2), nullable=False, default=0.00)
    included_service = Column(
        String(255),
        nullable=False,
        default='Hospedaje'
    )
    completed = Column(Boolean, nullable=False, default=False)

    __table_args__ = (
        CheckConstraint(
            "included_service IN ("
            "'Cuidado', 'Adiestramiento', 'Peluquería', 'Recepción', "
            "'Alimentacion especial', 'Nutrición estandar', 'Cuidado de crias', "
            "'Adiestramiento avanzado', 'Cuidado nocturno', 'Psicología animal', "
            "'Celebracion eventos'"
            ")",
            name="check_included_service"
        ),
        Index("factura_id_servicio_index", "service_id")
    )


