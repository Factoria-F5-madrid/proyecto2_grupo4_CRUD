import asyncio
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


from backend.db.database import engine
from backend.models import Base
from backend.models.service_models import Service
from backend.models.user_models import User
from backend.models.reservation_models import Reservation
from backend.models.pet_models import Pet
from backend.models.employee_models import Employee
from backend.models.activity_log_models import ActivityLog
from backend.models.medical_history_models import MedicalHistory
from backend.models.assignment_models import Assignment
from backend.models.payment_models import Payment
from backend.models.invoice_models import Invoice


__all__ = [
    'Base',
    'Service',
    'User',
    'Reservation',
    'Pet',
    'Employee',
    'ActivityLog',
    'MedicalHistory',
    'Assignment',
    'Payment',
    'Invoice'
]


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        print('Base de datos inicializada correctamente')

if __name__ == "__main__":
    asyncio.run(init_db())      