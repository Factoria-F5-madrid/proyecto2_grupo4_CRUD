from sqlalchemy import Column, Integer, Text, TIMESTAMP, ForeignKey, func
from sqlalchemy.orm import relationship
from .base_models import Base  
from .enums import SqlMedicalHistoryTypeEnum


class MedicalHistory(Base):
    __tablename__ = "MedicalHistory"

    id = Column(Integer, primary_key=True, nullable=False)
    pet_id = Column(Integer, ForeignKey("Pet.pet_id"), nullable=False)
    date = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    type = Column(SqlMedicalHistoryTypeEnum, nullable=False, server_default="Otro")
    description = Column(Text, nullable=False)

    
    pet = relationship("Pet", back_populates="medical_history")


