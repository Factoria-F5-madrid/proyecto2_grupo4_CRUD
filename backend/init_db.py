import asyncio
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from db.database import engine
from models.user_models import Base
from models import pet_model

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        await conn.run_sync(pet_model.Base.metadata.create_all)
        print('Tablas creadas correctamente')

if __name__ == "__main__":
    asyncio.run(init_db())      