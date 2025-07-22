from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from backend.schema.assignment_schema import AssignmentCreate, AssignmentOut, AssignmentUpdate
from backend.controllers.assignment_controller import (
    create_assignment_controller,
    get_all_assignments_controller,
    get_assignment_by_id_controller,
    update_assignment_controller,
    delete_assignment_controller,
)
from backend.db.database import get_db

router = APIRouter()

@router.post("/", response_model=AssignmentOut)
async def create_assignment(assignment_data: AssignmentCreate, db: AsyncSession = Depends(get_db)):
    return await create_assignment_controller(assignment_data, db)

@router.get("/", response_model=List[AssignmentOut])
async def get_all_assignments(db: AsyncSession = Depends(get_db)):
    return await get_all_assignments_controller(db)

@router.get("/{assignment_id}", response_model=AssignmentOut)
async def get_assignment_by_id(assignment_id: int, db: AsyncSession = Depends(get_db)):
    assignment = await get_assignment_by_id_controller(assignment_id, db)
    if assignment is None:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return assignment

@router.put("/{assignment_id}", response_model=AssignmentOut)
async def update_assignment(assignment_id: int, assignment_data: AssignmentUpdate, db: AsyncSession = Depends(get_db)):
    updated_assignment = await update_assignment_controller(assignment_id, assignment_data, db)
    if updated_assignment is None:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return updated_assignment

@router.delete("/{assignment_id}")
async def delete_assignment(assignment_id: int, db: AsyncSession = Depends(get_db)):
    result = await delete_assignment_controller(assignment_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return result