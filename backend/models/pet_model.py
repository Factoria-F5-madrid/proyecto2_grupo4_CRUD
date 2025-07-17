from sqlalchemy import Column, Integer, String, Date, ForeignKey, CheckConstraint
from sqlalchemy.ext.declarative import declarative_base
from backend.models.base_models import Base
from .enums import PetTypeEnum

class Pet(Base):
      __tablename__ = 'Pet'

      pet_id = Column(Integer, primary_key=True, nullable=False)
      name = Column(String(100), nullable=False)
      species = Column(PetTypeEnum, nullable=False)
      breed = Column(String(100), nullable=False)
      birth_date = Column(Date, nullable=False)
      allergies = Column(String(100), nullable=False)
      special_needs = Column(String(100), nullable=False)

      client_id = Column(Integer, ForeignKey('User.client_id'), nullable=False)

      
      