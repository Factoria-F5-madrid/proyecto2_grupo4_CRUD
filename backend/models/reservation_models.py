from sqlalchemy import Column, Integer, TIMESTAMP, ForeignKey, func, Boolean
from sqlalchemy.orm import relationship
from .base_models import Base


class Reservation(Base):
    __tablename__ = "Reservation"

    reservation_id = Column(Integer, primary_key=True, nullable=False)
    service_id = Column(Integer, ForeignKey("Service.service_id"), nullable=False)
    pet_id = Column(Integer, ForeignKey("Pet.pet_id"), nullable=False)
    start_date = Column(TIMESTAMP(timezone=False), nullable=False)
    end_date = Column(TIMESTAMP(timezone=False), nullable=False)
    is_confirmed = Column(Boolean, nullable=False, server_default="false")
    created_at = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())

    service = relationship("Service", back_populates="reservations")
    pet = relationship("Pet", back_populates="reservations") 