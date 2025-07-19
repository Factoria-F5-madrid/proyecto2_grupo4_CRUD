from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from backend.schema.user_schema import UserCreate, UserOut, UserUpdate
from backend.controllers.user_controllers import (
    create_user_controller,
    get_all_users_controller,
    get_user_by_id_controller,
    update_user_controller,
    delete_user_controller,
)
from backend.db.database import get_db


router = APIRouter()

@router.post("/", response_model=UserOut)
async def create_user(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    return await create_user_controller(user_data, db)

@router.get("/", response_model=List[UserOut])
async def get_all_users(db: AsyncSession = Depends(get_db)):
    return await get_all_users_controller(db)

@router.get("/{user_id}", response_model=UserOut)
async def get_user_by_id(user_id: int, db: AsyncSession = Depends(get_db)):
    user = await get_user_by_id_controller(user_id, db)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserOut)
async def update_user(user_id: int, user_data: UserUpdate, db: AsyncSession = Depends(get_db)):
    updated_user = await update_user_controller(user_id, user_data, db)
    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

@router.delete("/{user_id}")
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await delete_user_controller(user_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": f"User with ID {user_id} deleted successfully"}