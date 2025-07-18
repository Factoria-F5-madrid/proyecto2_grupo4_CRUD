import asyncio
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from backend.db.database import engine
from models.base_models import Base

from models.user_models import User
from models.payment_models import Payment
from models.service_models import Service
from models.assignment_models import Assignment
from models.invoice_models import Invoice
from models.medicalHistory_models import MedicalHistory

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        print('Tablas creadas correctamente')

if __name__ == "__main__":
    asyncio.run(init_db())      