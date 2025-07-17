from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class assignment(Base):
    __table__ = "assignment"

    assignment_id = Column(Integer, primary_key=True, nullable= False)
    date_assigment = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    service_id= Column(Integer, ForeignKey("service.service_id"))
    employee_id = Column(Integer, ForeignKey("employee.employee_id"))

    service = relationship("Service", back_populates="assignments")
    employee = relationship("Employee", back_populates="assignments")
