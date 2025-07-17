from sqlalchemy import Column, Integer, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import relationship
from .base_models import Base



class Assignment(Base):
    __tablename__ = "assignment"

    assignment_id = Column(Integer, primary_key=True, nullable=False)
    date_assignment = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    service_id = Column(Integer, ForeignKey("Service.service_id"), nullable=False)
    employee_id = Column(Integer, ForeignKey("Employee.employee_id"), nullable=False)

    service = relationship("Service", back_populates="assignments")
    employee = relationship("Employee", back_populates="assignments")