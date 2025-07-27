from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import join
from backend.exceptions.custom_exceptions import NotFoundException, BadRequestException

from backend.models.employee_models import Employee
from backend.models.user_models import User
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
    logger.info("Fetching all employees with user data")
    
    # Hacer JOIN entre Employee y User para obtener datos completos
    query = select(Employee, User).join(
        User, 
        Employee.employee_id == User.user_id
    ).where(User.role == 'employee')
    
    result = await db.execute(query)
    rows = result.all()
    
    # Combinar los datos de Employee y User
    employees = []
    for employee, user in rows:
        employee_dict = {
            'employee_id': employee.employee_id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone_number': user.phone_number,
            'address': user.address,
            'specialty': employee.specialty.value if employee.specialty else None,
            'is_active': employee.is_active,
            'created_at': employee.created_at,
            'updated_at': employee.updated_at
        }
        employees.append(employee_dict)
    
    logger.info(f"Fetched {len(employees)} employees with user data")
    return employees

async def get_employee_by_id_controller(employee_id: int, db: AsyncSession):
    logger.info(f"Fetching employee with ID: {employee_id}")
    
    # Hacer JOIN entre Employee y User para obtener datos completos
    query = select(Employee, User).join(
        User, 
        Employee.employee_id == User.user_id
    ).where(
        Employee.employee_id == employee_id,
        User.role == 'employee'
    )
    
    result = await db.execute(query)
    row = result.first()
    
    if row is None:
        logger.warning(f"Employee with ID {employee_id} not found")
        raise NotFoundException("Employee not found")
    
    employee, user = row
    
    # Combinar los datos de Employee y User
    employee_dict = {
        'employee_id': employee.employee_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'phone_number': user.phone_number,
        'address': user.address,
        'specialty': employee.specialty.value if employee.specialty else None,
        'is_active': employee.is_active,
        'created_at': employee.created_at,
        'updated_at': employee.updated_at
    }
    
    logger.info(f"Found employee with ID: {employee_id}")    
    return employee_dict

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
