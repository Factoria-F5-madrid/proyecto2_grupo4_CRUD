from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base_models import Base
from .enums import ActivityTypeEnum

class ActivityLog(Base):
    __tablename__ = "ActivityLog"
    
    activity_id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("Employees.employee_id"), nullable=False)
    pet_id = Column(Integer, ForeignKey("Pet.pet_id"), nullable=False)
    activity_type = Column(Enum(ActivityTypeEnum), nullable=False)
    description = Column(Text, nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
   
    employee = relationship("Employee", back_populates="activity_log")
    pet = relationship("Pet", back_populates="activity_log")
