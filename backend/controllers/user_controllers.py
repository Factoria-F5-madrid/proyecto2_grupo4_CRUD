from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.sql import func
from datetime import datetime

from backend.models.user_models import User
from backend.schema.user_schema import UserCreate, UserUpdate, UserOut

from backend.logger.logger import logger  


async def create_user_controller(user_data: UserCreate, db: AsyncSession):
    logger.debug(f"Creating user with data: {user_data}")
    new_user = User(**user_data.dict())
    new_user.registration_date = datetime.utcnow() 
    new_user.updated_by = "system" 
    new_user.update_date = func.now() 
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    logger.info(f"User created successfully with ID: {new_user.user_id}")
    return new_user

async def get_all_users_controller(db: AsyncSession):
    logger.debug("Fetching all users")
    result = await db.execute(select(User))
    users = result.scalars().all()
    logger.info(f"Fetched {len(users)} users")
    return users

async def get_user_by_id_controller(user_id: int, db: AsyncSession):
    logger.debug(f"Fetching user by ID: {user_id}")
    result = await db.execute(select(User).where(User.user_id == user_id))
    user = result.scalar_one_or_none()
    
    if user:
        logger.info(f"User found with ID: {user_id}")
    else:
        logger.warning(f"User not found with ID: {user_id}")
    
    return user

async def update_user_controller(user_id: int, user_data: UserUpdate, db: AsyncSession):
    logger.debug(f"Updating user ID {user_id} with data: {user_data}")
    result = await db.execute(select(User).where(User.user_id== user_id))
    user = result.scalar_one_or_none()
    if not user:
        logger.warning(f"User not found for update with ID: {user_id}") 
        return None
    for field, value in user_data.model_dump(exclude_unset=True).items():
        setattr(user, field, value)
    user.updated_by = "system"  
    user.update_date = func.now()  
    await db.commit()
    await db.refresh(user)
    logger.info(f"User updated successfully with ID: {user_id}") 
    return user

async def delete_user_controller(user_id: int, db: AsyncSession):
    logger.debug(f"Deleting user with ID: {user_id}")
    result = await db.execute(select(User).where(User.user_id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        logger.warning(f"User not found for deletion with ID: {user_id}")
        return False
    await db.delete(user)
    await db.commit()
    logger.info(f"User deleted successfully with ID: {user_id}")
    return True