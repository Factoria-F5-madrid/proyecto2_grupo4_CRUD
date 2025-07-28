from sqlalchemy import Column, Integer, BigInteger, String, Text, TIMESTAMP, func
from sqlalchemy.orm import relationship
from .base_models import Base

class User(Base):
    __tablename__ = 'User'

    user_id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    phone_number = Column(BigInteger, nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    address = Column(Text, nullable=False)
    last_update = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    updated_by = Column(String(55), nullable=False)
    update_date = Column(TIMESTAMP(timezone=False), nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String(20), nullable=False, default="user")


    reservations = relationship("Reservation", back_populates="user")
    pet = relationship("Pet", back_populates="user")

