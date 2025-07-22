from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException

from backend.models.assignment_models import Assignment
from backend.schema.assignment_schema import AssignmentCreate, AssignmentUpdate

async def create_assignment_controller(assignment_data: AssignmentCreate, db: AsyncSession):
    new_assignment = Assignment(**assignment_data.dict())
    db.add(new_assignment)
    await db.commit()
    await db.refresh(new_assignment)
    return new_assignment

async def get_all_assignments_controller(db: AsyncSession):
    result = await db.execute(select(Assignment))
    return result.scalars().all()

async def get_assignment_by_id_controller(assignment_id: int, db: AsyncSession):
    result = await db.execute(select(Assignment).where(Assignment.assignment_id == assignment_id))
    assignment = result.scalar_one_or_none()
    if assignment is None:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return assignment

async def update_assignment_controller(assignment_id: int, assignment_data: AssignmentUpdate, db: AsyncSession):
    result = await db.execute(select(Assignment).where(Assignment.assignment_id == assignment_id))
    assignment = result.scalar_one_or_none()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    for field, value in assignment_data.dict(exclude_unset=True).items():
        setattr(assignment, field, value)

    await db.commit()
    await db.refresh(assignment)
    return assignment

async def delete_assignment_controller(assignment_id: int, db: AsyncSession):
    result = await db.execute(select(Assignment).where(Assignment.assignment_id == assignment_id))
    assignment = result.scalar_one_or_none()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    await db.delete(assignment)
    await db.commit()
    return {"detail": f"Assignment with ID {assignment_id} deleted successfully"}