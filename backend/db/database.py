from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+asyncpg://postgres@localhost:5432/petland"

engine = create_async_engine(DATABASE_URL, echo=True)