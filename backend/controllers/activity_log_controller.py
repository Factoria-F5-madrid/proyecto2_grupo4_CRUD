from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.exceptions.custom_exceptions import NotFoundException

from backend.models.activity_log_models import ActivityLog
from backend.models.pet_models import Pet
from backend.models.employee_models import Employee
from backend.schema.activity_log_schema import ActivityLogCreate, ActivityLogUpdate

from backend.logger.logger import logger

async def create_activitylog_controller(activity_data: ActivityLogCreate, db: AsyncSession):
   
    logger.info(f"Creating ActivityLog for pet_id: {activity_data.pet_id}, employee_id: {activity_data.employee_id}")
    pet_result = await db.execute(select(Pet).where(Pet.pet_id == activity_data.pet_id))
    pet = pet_result.scalar_one_or_none()
    if not pet:
        raise NotFoundException(f"Pet with id {activity_data.pet_id} not found")


    employee_result = await db.execute(select(Employee).where(Employee.employee_id == activity_data.employee_id))
    employee = employee_result.scalar_one_or_none()
    if not employee:
        raise NotFoundException(f"Employee with id {activity_data.employee_id} not found")


    new_activity = ActivityLog(**activity_data.model_dump())
    db.add(new_activity)
    await db.commit()
    await db.refresh(new_activity)
    logger.error(f"Employee with id {activity_data.employee_id} not found")
    return new_activity

async def get_all_activitylogs_controller(db: AsyncSession):
    logger.info("Fetching all ActivityLogs")
    result = await db.execute(select(ActivityLog))
    all_activities = result.scalars().all()
    logger.info(f"Found {len(all_activities)} ActivityLogs")
    return all_activities

async def get_activitylog_by_id_controller(activity_id: int, db: AsyncSession):
    logger.info(f"Fetching ActivityLog with ID {activity_id}")
    result = await db.execute(select(ActivityLog).where(ActivityLog.activity_id == activity_id))
    activity = result.scalar_one_or_none()
    if activity is None:
        raise NotFoundException(f"ActivityLog with ID {activity_id} not found")
    return activity

async def update_activitylog_controller(activity_id: int, activity_data: ActivityLogUpdate, db: AsyncSession):
    logger.info(f"Updating ActivityLog with ID {activity_id}")
    result = await db.execute(select(ActivityLog).where(ActivityLog.activity_id == activity_id))
    activity = result.scalar_one_or_none()
    if not activity:
        raise NotFoundException(f"ActivityLog with ID {activity_id} not found")

    for field, value in activity_data.model_dump(exclude_unset=True).items():
        setattr(activity, field, value)

    await db.commit()
    await db.refresh(activity)
    logger.info(f"ActivityLog with ID {activity_id} updated successfully")
    return activity

async def delete_activitylog_controller(activity_id: int, db: AsyncSession):
    logger.info(f"ActivityLog with ID {activity_id} updated successfully")
    result = await db.execute(select(ActivityLog).where(ActivityLog.activity_id == activity_id))
    activity = result.scalar_one_or_none()
    if not activity:
        raise NotFoundException(f"ActivityLog with ID {activity_id} not found")

    await db.delete(activity)
    await db.commit()
    logger.info(f"ActivityLog with ID {activity_id} deleted successfully")
    return {"detail": f"ActivityLog with ID {activity_id} deleted successfully"}
