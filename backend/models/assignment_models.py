from sqlalchemy import Column, Integer, BigInteger, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base_models import Base


class Assignment(Base):
    __tablename__ = "Assigment"

    assignment_id = Column(Integer, primary_key=True, index=True)
    service_id = Column(BigInteger, ForeignKey("Service.service_id"), nullable=False)
    employee_id = Column(Integer, ForeignKey("Employees.employee_id"), nullable=False)
    assignment_date = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

  
    service = relationship("Service", back_populates="assignments")
    employee = relationship("Employee", back_populates="assignments")