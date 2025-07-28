from typing import List, Optional
from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.db.database import get_db
from backend.models.user_models import User
from backend.models.enums import UserRole, Permission, ROLE_PERMISSIONS
from backend.utils.auth_jwt import get_current_user

class AuthorizationService:
    """Servicio para manejar autorización basada en roles y permisos"""
    
    @staticmethod
    def has_permission(user_role: UserRole, required_permission: Permission) -> bool:
        """Verifica si un rol tiene un permiso específico"""
        if user_role not in ROLE_PERMISSIONS:
            return False
        return required_permission in ROLE_PERMISSIONS[user_role]
    
    @staticmethod
    def has_any_permission(user_role: UserRole, required_permissions: List[Permission]) -> bool:
        """Verifica si un rol tiene al menos uno de los permisos requeridos"""
        if user_role not in ROLE_PERMISSIONS:
            return False
        return any(perm in ROLE_PERMISSIONS[user_role] for perm in required_permissions)
    
    @staticmethod
    def has_all_permissions(user_role: UserRole, required_permissions: List[Permission]) -> bool:
        """Verifica si un rol tiene todos los permisos requeridos"""
        if user_role not in ROLE_PERMISSIONS:
            return False
        return all(perm in ROLE_PERMISSIONS[user_role] for perm in required_permissions)
    
    @staticmethod
    def is_admin(user_role: UserRole) -> bool:
        """Verifica si el usuario es administrador"""
        return user_role == UserRole.ADMIN
    
    @staticmethod
    def is_employee(user_role: UserRole) -> bool:
        """Verifica si el usuario es empleado"""
        return user_role == UserRole.EMPLOYEE
    
    @staticmethod
    def is_user(user_role: UserRole) -> bool:
        """Verifica si el usuario es cliente"""
        return user_role == UserRole.USER

# Funciones de dependencia para FastAPI
def require_permission(permission: Permission):
    """Dependencia que requiere un permiso específico"""
    async def permission_checker(current_user: dict = Depends(get_current_user)):
        user_role = UserRole(current_user["role"])
        if not AuthorizationService.has_permission(user_role, permission):
            raise HTTPException(
                status_code=403,
                detail=f"No tienes permiso para realizar esta acción. Requiere: {permission}"
            )
        return current_user
    return permission_checker

def require_any_permission(permissions: List[Permission]):
    """Dependencia que requiere al menos uno de varios permisos"""
    async def permission_checker(current_user: dict = Depends(get_current_user)):
        user_role = UserRole(current_user["role"])
        if not AuthorizationService.has_any_permission(user_role, permissions):
            raise HTTPException(
                status_code=403,
                detail=f"No tienes permiso para realizar esta acción. Requiere uno de: {permissions}"
            )
        return current_user
    return permission_checker

def require_admin():
    """Dependencia que requiere rol de administrador"""
    async def admin_checker(current_user: dict = Depends(get_current_user)):
        user_role = UserRole(current_user["role"])
        if not AuthorizationService.is_admin(user_role):
            raise HTTPException(
                status_code=403,
                detail="Solo los administradores pueden realizar esta acción"
            )
        return current_user
    return admin_checker

def require_employee_or_admin():
    """Dependencia que requiere rol de empleado o administrador"""
    async def employee_admin_checker(current_user: dict = Depends(get_current_user)):
        user_role = UserRole(current_user["role"])
        if not (AuthorizationService.is_employee(user_role) or AuthorizationService.is_admin(user_role)):
            raise HTTPException(
                status_code=403,
                detail="Solo empleados y administradores pueden realizar esta acción"
            )
        return current_user
    return employee_admin_checker

# Funciones para verificar acceso a recursos específicos
async def can_access_user_resource(
    current_user: User,
    target_user_id: int,
    db: AsyncSession
) -> bool:
    """Verifica si el usuario actual puede acceder a un recurso de otro usuario"""
    user_role = UserRole(current_user.role)
    
    # Los administradores pueden acceder a todo
    if AuthorizationService.is_admin(user_role):
        return True
    
    # Los empleados pueden acceder a recursos de usuarios
    if AuthorizationService.is_employee(user_role):
        return True
    
    # Los usuarios solo pueden acceder a sus propios recursos
    return current_user.user_id == target_user_id

async def can_access_pet_resource(
    current_user: User,
    target_pet_id: int,
    db: AsyncSession
) -> bool:
    """Verifica si el usuario actual puede acceder a un recurso de mascota"""
    user_role = UserRole(current_user.role)
    
    # Los administradores pueden acceder a todo
    if AuthorizationService.is_admin(user_role):
        return True
    
    # Los empleados pueden acceder a todas las mascotas
    if AuthorizationService.is_employee(user_role):
        return True
    
    # Los usuarios solo pueden acceder a sus propias mascotas
    from backend.models.pet_models import Pet
    result = await db.execute(select(Pet).where(Pet.pet_id == target_pet_id))
    pet = result.scalar_one_or_none()
    
    if not pet:
        return False
    
    return pet.user_id == current_user.user_id

# Funciones de utilidad para el frontend
def get_user_permissions(user_role: str) -> List[str]:
    """Obtiene la lista de permisos de un rol para el frontend"""
    try:
        role = UserRole(user_role)
        return [perm.value for perm in ROLE_PERMISSIONS.get(role, [])]
    except ValueError:
        return []

def get_available_routes(user_role: str) -> dict:
    """Obtiene las rutas disponibles para un rol específico"""
    role = UserRole(user_role)
    permissions = ROLE_PERMISSIONS.get(role, [])
    
    routes = {
        "dashboard": True,
        "users": Permission.READ_USER in permissions,
        "employees": Permission.READ_EMPLOYEE in permissions,
        "pets": Permission.READ_PET in permissions,
        "reservations": Permission.READ_RESERVATION in permissions,
        "services": Permission.READ_SERVICE in permissions,
        "medical_history": Permission.READ_MEDICAL_HISTORY in permissions,
        "invoices": Permission.READ_INVOICE in permissions,
        "payments": Permission.READ_PAYMENT in permissions,
        "exports": Permission.EXPORT_DATA in permissions,
        "admin": AuthorizationService.is_admin(role),
        "logs": Permission.VIEW_LOGS in permissions,
        "settings": Permission.SYSTEM_CONFIG in permissions
    }
    
    return routes 