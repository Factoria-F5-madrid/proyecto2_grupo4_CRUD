from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base_models import Base
from .enums import EmployeeSpecialtyEnum


class Employee(Base):
    __tablename__ = "Employees"

    employee_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    specialty = Column(Enum(EmployeeSpecialtyEnum), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    activity_log = relationship("ActivityLog", back_populates="employee")
    assignments = relationship("Assignment", back_populates="employee")
