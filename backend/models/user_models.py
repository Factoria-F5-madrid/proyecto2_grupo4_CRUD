from sqlalchemy import Column, Integer, BigInteger, String, Text, TIMESTAMP, func
from sqlalchemy.ext.declarative import declarative_base
from backend.models import Base  # usa el único Base común


# Base = declarative_base()

class User(Base):
    __tablename__ = 'User'

    client_id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    phone_number = Column(BigInteger, nullable=False, unique=True)
    email = Column(String(150), nullable=False, unique=True)
    address = Column(Text, nullable=False)
    registration_date = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    last_update = Column(TIMESTAMP(timezone=False), nullable=False, server_default=func.now())
    updated_by = Column(String(55), nullable=False)
    update_date = Column(TIMESTAMP(timezone=False), nullable=False)
