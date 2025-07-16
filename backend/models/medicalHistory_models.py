from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey, Index, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class MedicalHistory(Base):
    __tablename__ = "MedicalHistory"

    id = Column(Integer, primary_key=True, index=True) 
    pet_id = Column(Integer, ForeignKey("pet_id"), nullable=False, index=True) 
    date = Column(TIMESTAMP(timezone=False), nullable=False, default=func.current_timestamp())  
    type = Column(String(30), nullable=False) 
    description = Column(Text, nullable=False) 

    __table_args__ = (
        Index("historial_medico_id_mascota_index", "pet_id"),
    )