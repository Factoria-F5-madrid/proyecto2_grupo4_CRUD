import asyncio
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


from backend.db.database import engine
from backend.models import Base
from backend.models.service_models import Service
from backend.models.user_models import User
from backend.models.reservation_models import Reservation

__all__ = [
    'Base',
    'Service',
    'User',
    'Reservation'
]


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        print('Base de datos inicializada correctamente')

if __name__ == "__main__":
    asyncio.run(init_db())      