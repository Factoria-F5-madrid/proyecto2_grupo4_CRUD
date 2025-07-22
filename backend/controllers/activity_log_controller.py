from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException

from backend.models.activity_log_models import ActivityLog
from backend.models.pet_models import Pet
from backend.models.employee_models import Employee
from backend.schema.activity_log_schema import ActivityLogCreate, ActivityLogUpdate

async def create_activitylog_controller(activity_data: ActivityLogCreate, db: AsyncSession):
   
    pet_result = await db.execute(select(Pet).where(Pet.pet_id == activity_data.pet_id))
    pet = pet_result.scalar_one_or_none()
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")


    employee_result = await db.execute(select(Employee).where(Employee.employee_id == activity_data.employee_id))
    employee = employee_result.scalar_one_or_none()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    new_activity = ActivityLog(**activity_data.model_dump())
    db.add(new_activity)
    await db.commit()
    await db.refresh(new_activity)
    return new_activity

async def get_all_activitylogs_controller(db: AsyncSession):
    result = await db.execute(select(ActivityLog))
    return result.scalars().all()

async def get_activitylog_by_id_controller(activity_id: int, db: AsyncSession):
    result = await db.execute(select(ActivityLog).where(ActivityLog.activity_id == activity_id))
    activity = result.scalar_one_or_none()
    if activity is None:
        raise HTTPException(status_code=404, detail="ActivityLog not found")
    return activity

async def update_activitylog_controller(activity_id: int, activity_data: ActivityLogUpdate, db: AsyncSession):
    result = await db.execute(select(ActivityLog).where(ActivityLog.activity_id == activity_id))
    activity = result.scalar_one_or_none()
    if not activity:
        raise HTTPException(status_code=404, detail="ActivityLog not found")

    for field, value in activity_data.model_dump(exclude_unset=True).items():
        setattr(activity, field, value)

    await db.commit()
    await db.refresh(activity)
    return activity

async def delete_activitylog_controller(activity_id: int, db: AsyncSession):
    result = await db.execute(select(ActivityLog).where(ActivityLog.activity_id == activity_id))
    activity = result.scalar_one_or_none()
    if not activity:
        raise HTTPException(status_code=404, detail="ActivityLog not found")

    await db.delete(activity)
    await db.commit()
    return {"detail": f"ActivityLog with ID {activity_id} deleted successfully"}
