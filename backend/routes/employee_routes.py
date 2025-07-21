from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from backend.schema.employee_schema import EmployeeCreate, EmployeeOut, EmployeeUpdate
from backend.controllers.employee_controller import (
    create_employee_controller,
    get_all_employees_controller,
    get_employee_by_id_controller,
    update_employee_controller,
    delete_employee_controller,
)
from backend.db.database import get_db

router = APIRouter()

@router.post("/", response_model=EmployeeOut)
async def create_employee(employee_data: EmployeeCreate, db: AsyncSession = Depends(get_db)):
    return await create_employee_controller(employee_data, db)

@router.get("/", response_model=List[EmployeeOut])
async def get_all_employees(db: AsyncSession = Depends(get_db)):
    return await get_all_employees_controller(db)

@router.get("/{employee_id}", response_model=EmployeeOut)
async def get_employee_by_id(employee_id: int, db: AsyncSession = Depends(get_db)):
    employee = await get_employee_by_id_controller(employee_id, db)
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@router.put("/{employee_id}", response_model=EmployeeOut)
async def update_employee(employee_id: int, employee_data: EmployeeUpdate, db: AsyncSession = Depends(get_db)):
    updated_employee = await update_employee_controller(employee_id, employee_data, db)
    if updated_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return updated_employee

@router.delete("/{employee_id}")
async def delete_employee(employee_id: int, db: AsyncSession = Depends(get_db)):
    result = await delete_employee_controller(employee_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Employee not found")
    return result
