from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.exceptions.custom_exceptions import NotFoundException, BadRequestException

from backend.models.assignment_models import Assignment
from backend.schema.assignment_schema import AssignmentCreate, AssignmentUpdate

from backend.logger.logger import logger

async def create_assignment_controller(assignment_data: AssignmentCreate, db: AsyncSession):
    logger.info(f"Creating assignment with data: {assignment_data.dict()}")

    try:
        new_assignment = Assignment(**assignment_data.dict())
        db.add(new_assignment)
        await db.commit()
        await db.refresh(new_assignment)
        logger.info(f"Assignment created with ID: {new_assignment.assignment_id}")
        return new_assignment
    except Exception as e:
        logger.error(f"Error creating assignment: {e}", exc_info=True)
        raise BadRequestException("Failed to create assignment")    

async def get_all_assignments_controller(db: AsyncSession):
    logger.info("Fetching all assignments")
    result = await db.execute(select(Assignment))
    assignments = result.scalars().all()
    logger.info(f"Fetched {len(assignments)} assignments")
    return assignments

async def get_assignment_by_id_controller(assignment_id: int, db: AsyncSession):
    logger.info(f"Fetching assignment with ID: {assignment_id}")
    result = await db.execute(select(Assignment).where(Assignment.assignment_id == assignment_id))
    assignment = result.scalar_one_or_none()
    if assignment is None:
        logger.warning(f"Assignment with ID {assignment_id} not found")
        raise HTTPException(status_code=404, detail="Assignment not found")
    logger.info(f"Found assignment with ID: {assignment_id}")    
    return assignment

async def update_assignment_controller(assignment_id: int, assignment_data: AssignmentUpdate, db: AsyncSession):
    logger.info(f"Updating assignment with ID: {assignment_id}")
    result = await db.execute(select(Assignment).where(Assignment.assignment_id == assignment_id))
    assignment = result.scalar_one_or_none()

    if not assignment:
        logger.warning(f"Assignment with ID {assignment_id} not found for update")
        raise HTTPException(status_code=404, detail="Assignment not found")

    try:
        for field, value in assignment_data.dict(exclude_unset=True).items():
            setattr(assignment, field, value)

        await db.commit()
        await db.refresh(assignment)
        logger.info(f"Updated assignment with ID: {assignment_id}")
        return assignment

    except Exception as e:
        logger.error(f"Error updating assignment: {e}", exc_info=True)
        raise BadRequestException("Failed to update assignment")    

async def delete_assignment_controller(assignment_id: int, db: AsyncSession):
    logger.info(f"Deleting assignment with ID: {assignment_id}")
    result = await db.execute(select(Assignment).where(Assignment.assignment_id == assignment_id))
    assignment = result.scalar_one_or_none()

    if not assignment:
        logger.warning(f"Assignment with ID {assignment_id} not found for deletion")
        raise HTTPException(status_code=404, detail="Assignment not found")

    try:
        await db.delete(assignment)
        await db.commit()
        logger.info(f"Deleted assignment with ID: {assignment_id}")
        return {"detail": f"Assignment with ID {assignment_id} deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting assignment: {e}", exc_info=True)
        raise BadRequestException("Failed to delete assignment")    