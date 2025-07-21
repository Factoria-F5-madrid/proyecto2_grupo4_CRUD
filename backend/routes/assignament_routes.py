from fastapi import APIRouter, Depends, Path
from sqlalchemy.ext.asyncio import AsyncSession
from db.database import AsyncSessionLocal
from controllers import assignment_controller
from schema.assignment_schema import AssignmentSchema

router = APIRouter(tags=["Assignments"])

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/assignments/")
async def get_assignments(db: AsyncSession = Depends(get_db)):
    return await assignment_controller.get_assignments(db)

@router.get("/assignments/{assignment_id}")
async def get_assignment_by_id(
    assignment_id: int = Path(..., gt=0),
    db: AsyncSession = Depends(get_db)
):
    return await assignment_controller.get_assignment_by_id(db, assignment_id)

@router.post("/assignments/")
async def create_assignment(
    assignment: AssignmentSchema,
    db: AsyncSession = Depends(get_db)
):
    return await assignment_controller.create_assignment(db, assignment)

@router.put("/assignments/{assignment_id}")
async def update_assignment(
    assignment_id: int = Path(..., gt=0),
    assignment: AssignmentSchema,
    db: AsyncSession = Depends(get_db)
):
    return await assignment_controller.update_assignment(db, assignment_id, assignment)

@router.delete("/assignments/{assignment_id}")
async def delete_assignment(
    assignment_id: int = Path(..., gt=0),
    db: AsyncSession = Depends(get_db)
):
    return await assignment_controller.delete_assignment(db, assignment_id)