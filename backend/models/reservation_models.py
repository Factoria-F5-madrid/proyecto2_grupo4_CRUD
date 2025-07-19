from sqlalchemy import Column, Integer, TIMESTAMP, ForeignKey, func, Boolean
from sqlalchemy.orm import relationship

from .base_models import Base
from .user_models import User
from .service_models import Service

class Reservation(Base):
    __tablename__ = "Reservation"

    reservation_id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey("User.user_id"), nullable=False)
    service_id = Column(Integer, ForeignKey("Service.service_id"), nullable=False)
    start_date = Column(TIMESTAMP(timezone=False), nullable=False)
    end_date = Column(TIMESTAMP(timezone=False), nullable=False)
    is_confirmed = Column(Boolean, nullable=False, server_default="false")
    created_at = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())

   
    user = relationship("User", back_populates="reservations")
    service = relationship("Service", back_populates="reservations") 