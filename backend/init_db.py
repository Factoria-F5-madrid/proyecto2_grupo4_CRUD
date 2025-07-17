import asyncio
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
<<<<<<< HEAD
from backend.db.database import engine
from backend.models.user_models import Base
from backend.models.medicalHistory_models import Base as MedicalHistoryBase
=======
from db.database import engine
from models.user_models import Base
>>>>>>> 9d43106b48041079639173428bb2196182f9f5ab

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        await conn.run_sync(MedicalHistoryBase.metadata.create_all)
        print('Tablas creadas correctamente')

if __name__ == "__main__":
    asyncio.run(init_db())      