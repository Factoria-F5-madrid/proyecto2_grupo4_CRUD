from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from .base_models import Base
from .enums import SqlPetTypeEnum

class Pet(Base):
    __tablename__ = 'Pet'

    pet_id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    species = Column(SqlPetTypeEnum, nullable=False)
    breed = Column(String(100), nullable=False)
    birth_date = Column(Date, nullable=False)
    allergies = Column(String(100), nullable=True)
    special_needs = Column(String(100), nullable=True)

    user_id = Column(Integer, ForeignKey('User.user_id'), nullable=False)

  
    user = relationship("User", back_populates="pets") 