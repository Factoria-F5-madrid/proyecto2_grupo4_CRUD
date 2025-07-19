from sqlalchemy import Column, String, Integer, ForeignKey, TIMESTAMP, DateTime, func
from sqlalchemy.orm import relationship

from .base_models import Base
from .enums import SqlReservationStatusEnum

class Reservation(Base):
    __tablename__ = 'Reservation'

    reservation_id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey('User.user_id'), nullable=False)
    service_id = Column(Integer, ForeignKey('Service.service_id'), nullable=False)
    created_at = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    checkin_date = Column(DateTime(timezone=False), nullable=False)
    checkout_date = Column(DateTime(timezone=False), nullable=False)
    status = Column(SqlReservationStatusEnum, nullable=False, default="pending")
    internal_notes = Column(String(500), nullable=True)

  
    user = relationship("User", back_populates="reservations")
    service = relationship("Service", back_populates="reservations")