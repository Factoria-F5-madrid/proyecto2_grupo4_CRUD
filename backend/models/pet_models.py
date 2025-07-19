from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey, func, Numeric
from sqlalchemy.orm import relationship
from .base_models import Base


class Pet(Base):
    __tablename__ = "Pet"

    pet_id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    species = Column(String(50), nullable=False)
    breed = Column(String(100))
    age = Column(Integer)
    weight = Column(Numeric(5, 2))
    owner_id = Column(Integer, ForeignKey("User.user_id"), nullable=False)
    registration_date = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    notes = Column(Text)

    #owner = relationship("User", back_populates="pets")
    #medical_history = relationship("MedicalHistory", back_populates="pet")
    reservations = relationship("Reservation", back_populates="pet") 