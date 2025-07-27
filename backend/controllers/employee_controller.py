from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.exceptions.custom_exceptions import NotFoundException, BadRequestException

from backend.models.employee_models import Employee
from backend.schema.employee_schema import EmployeeCreate, EmployeeUpdate

from backend.logger.logger import logger

async def create_employee_controller(employee_data: EmployeeCreate, db: AsyncSession):
    logger.info(f"Creating employee with data: {employee_data.dict()}")
    new_employee = Employee(**employee_data.dict())
    db.add(new_employee)
    await db.commit()
    await db.refresh(new_employee)
    logger.info(f"Employee created with ID: {new_employee.employee_id}")
    return new_employee

async def get_all_employees_controller(db: AsyncSession):
    logger.info("Fetching all employees")
    try:
        result = await db.execute(select(Employee))
        employees = result.scalars().all()
        logger.info(f"Fetched {len(employees)} employees")
        return employees
    except Exception as e:
        logger.error(f"Error fetching employees: {e}")
        # Devolver una lista vacía en caso de error
        return []

async def get_employee_by_id_controller(employee_id: int, db: AsyncSession):
    logger.info(f"Fetching employee with ID: {employee_id}")
    result = await db.execute(select(Employee).where(Employee.employee_id == employee_id))
    employee = result.scalar_one_or_none()
    if employee is None:
        logger.warning(f"Employee with ID {employee_id} not found")
        raise NotFoundException("Employee not found")
    logger.info(f"Found employee with ID: {employee_id}")    
    return employee

async def update_employee_controller(employee_id: int, employee_data: EmployeeUpdate, db: AsyncSession):
    logger.info(f"Updating employee with ID: {employee_id}")
    result = await db.execute(select(Employee).where(Employee.employee_id == employee_id))
    employee = result.scalar_one_or_none()
    if not employee:
        logger.warning(f"Employee with ID {employee_id} not found for update")
        raise NotFoundException("Employee not found")

    for field, value in employee_data.dict(exclude_unset=True).items():
        setattr(employee, field, value)

    await db.commit()
    await db.refresh(employee)
    logger.info(f"Updated employee with ID: {employee_id}")
    return employee

async def delete_employee_controller(employee_id: int, db: AsyncSession):
    logger.info(f"Deleting employee with ID: {employee_id}")
    result = await db.execute(select(Employee).where(Employee.employee_id == employee_id))
    employee = result.scalar_one_or_none()
    if not employee:
        logger.warning(f"Employee with ID {employee_id} not found for deletion")
        raise NotFoundException("Employee not found")

    await db.delete(employee)
    await db.commit()
    logger.info(f"Deleted employee with ID: {employee_id}")
    return {"detail": f"Employee with ID {employee_id} deleted successfully"}
