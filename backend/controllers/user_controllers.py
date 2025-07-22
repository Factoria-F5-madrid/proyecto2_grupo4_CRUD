from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.sql import func
from fastapi import HTTPException

from backend.models.user_models import User
from backend.schema.user_schema import UserCreate, UserUpdate, UserOut

async def create_user_controller(user_data: UserCreate, db: AsyncSession):
    new_user = User(**user_data.dict())
    new_user.updated_by = "system" 
    new_user.update_date = func.now() 
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

async def get_all_users_controller(db: AsyncSession):
    result = await db.execute(select(User))
    return result.scalars().all()

async def get_user_by_id_controller(user_id: int, db: AsyncSession):
    result = await db.execute(select(User).where(User.user_id == user_id))
    return result.scalar_one_or_none()

async def update_user_controller(user_id: int, user_data: UserUpdate, db: AsyncSession):
    result = await db.execute(select(User).where(User.user_id== user_id))
    user = result.scalar_one_or_none()
    if not user:
        return None
    for field, value in user_data.model_dump(exclude_unset=True).items():
        setattr(user, field, value)
    user.updated_by = "system"  
    user.update_date = func.now()  
    await db.commit()
    await db.refresh(user)
    return user

async def delete_user_controller(user_id: int, db: AsyncSession):
    result = await db.execute(select(User).where(User.user_id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        return False
    await db.delete(user)
    await db.commit()
    return True