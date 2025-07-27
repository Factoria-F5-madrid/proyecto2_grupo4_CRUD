from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base_models import Base
from .enums import SqlMedicalHistoryStatusEnum

class MedicalHistory(Base):
    __tablename__ = "Medical_history"

    id = Column(Integer, primary_key=True, index=True)
    pet_id = Column(Integer, ForeignKey("Pet.pet_id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    type = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(SqlMedicalHistoryStatusEnum, nullable=True, default="activo")
    notes = Column(Text, nullable=True)

    pet = relationship("Pet", back_populates="medical_histories")
