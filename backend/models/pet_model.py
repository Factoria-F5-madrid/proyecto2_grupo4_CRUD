from sqlalchemy import Column, Integer, String, Date, ForeignKey, CheckConstraint
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Pet(Base):
      __tablename__ = 'Pet'

      pet_id = Column(Integer, primary_key=True, nullable=False)
      name = Column(String(100), nullable=False)
      species = Column(String(50), nullable=False)
      breed = Column(String(100), nullable=False)
      birth_date = Column(Date, nullable=False)
      allergies = Column(String(100), nullable=False)
      special_needs = Column(String(100), nullable=False)

      user_id = Column(Integer, ForeignKey('User.user_id'), nullable=False)

      __table_args__ = (
        CheckConstraint(
            species.in_([
                'Caninos',
                'Felinos',
                'Reptiles',
                'Anfibios',
                'Aves',
                'Peces',
                'Roedores',
                'Otro'
            ]),
            name='chk_species_type'
        ),
    )

      
      