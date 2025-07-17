from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, func, Boolean
from sqlalchemy.orm import relationship
from .base_models import Base


class Employee(Base):
    __tablename__ = "Employee"

    employee_id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    position = Column(String(100), nullable=False)
    phone_number = Column(String(20), nullable=False)
    email = Column(String(150), nullable=False, unique=True)
    hire_date = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    is_active = Column(Boolean, nullable=False, server_default="true")

    assignments = relationship("Assignment", back_populates="employee") 