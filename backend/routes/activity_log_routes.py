from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from backend.schema.activity_log_schema import ActivityLogCreate, ActivityLogOut, ActivityLogUpdate

from backend.controllers.activity_log_controller import (
    create_activitylog_controller,
    get_all_activitylogs_controller,
    get_activitylog_by_id_controller,
    update_activitylog_controller,
    delete_activitylog_controller,
)
from backend.db.database import get_db

router = APIRouter()

@router.post("/", response_model=ActivityLogOut)
async def create_activitylog(activity_data: ActivityLogCreate, db: AsyncSession = Depends(get_db)):
    return await create_activitylog_controller(activity_data, db)

@router.get("/", response_model=List[ActivityLogOut])
async def get_all_activitylogs(db: AsyncSession = Depends(get_db)):
    return await get_all_activitylogs_controller(db)

@router.get("/{activity_id}", response_model=ActivityLogOut)
async def get_activitylog_by_id(activity_id: int, db: AsyncSession = Depends(get_db)):
    return await get_activitylog_by_id_controller(activity_id, db)

@router.put("/{activity_id}", response_model=ActivityLogOut)
async def update_activitylog(activity_id: int, activity_data: ActivityLogUpdate, db: AsyncSession = Depends(get_db)):
    return await update_activitylog_controller(activity_id, activity_data, db)

@router.delete("/{activity_id}")
async def delete_activitylog(activity_id: int, db: AsyncSession = Depends(get_db)):
    result = await delete_activitylog_controller(activity_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="ActivityLog not found")
    return result
