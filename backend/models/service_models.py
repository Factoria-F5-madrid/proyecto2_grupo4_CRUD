from sqlalchemy import Column, Integer, Boolean, Text, Numeric, Time, TIMESTAMP, func
from sqlalchemy.orm import relationship
from .enums import SqlServiceTypeEnum
from .base_models import Base


class Service(Base):
    __tablename__ = 'Service'

    service_id = Column(Integer, primary_key=True, nullable=False)
    lodging = Column(Boolean, nullable=False)
    service_type = Column(SqlServiceTypeEnum, nullable=False)
    other_service = Column(Text)
    notes = Column(Text)
    base_price = Column(Numeric(10, 2), nullable=False)
    duration = Column(Time)
    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())

    reservations = relationship("Reservation", back_populates="service")