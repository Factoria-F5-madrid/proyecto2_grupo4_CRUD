from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException

from backend.models.employee_models import Employee
from backend.schema.employee_schema import EmployeeCreate, EmployeeUpdate

async def create_employee_controller(employee_data: EmployeeCreate, db: AsyncSession):
    new_employee = Employee(**employee_data.dict())
    db.add(new_employee)
    await db.commit()
    await db.refresh(new_employee)
    return new_employee

async def get_all_employees_controller(db: AsyncSession):
    result = await db.execute(select(Employee))
    return result.scalars().all()

async def get_employee_by_id_controller(employee_id: int, db: AsyncSession):
    result = await db.execute(select(Employee).where(Employee.employee_id == employee_id))
    employee = result.scalar_one_or_none()
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

async def update_employee_controller(employee_id: int, employee_data: EmployeeUpdate, db: AsyncSession):
    result = await db.execute(select(Employee).where(Employee.employee_id == employee_id))
    employee = result.scalar_one_or_none()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    for field, value in employee_data.dict(exclude_unset=True).items():
        setattr(employee, field, value)

    await db.commit()
    await db.refresh(employee)
    return employee

async def delete_employee_controller(employee_id: int, db: AsyncSession):
    result = await db.execute(select(Employee).where(Employee.employee_id == employee_id))
    employee = result.scalar_one_or_none()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    await db.delete(employee)
    await db.commit()
    return {"detail": f"Employee with ID {employee_id} deleted successfully"}
