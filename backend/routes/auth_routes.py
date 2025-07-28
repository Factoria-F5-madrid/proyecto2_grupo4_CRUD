from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from backend.schema.auth_schema import LoginRequest, RegisterRequest, TokenResponse, UserInfoResponse, RoleUpdateRequest
from backend.controllers.auth_controller import login_user, register_user
from backend.utils.auth_jwt import get_current_user
from backend.utils.authorization import get_user_permissions, get_available_routes, require_admin
from backend.db.database import get_db
from backend.logger.logger import logger

router = APIRouter()

@router.get("/test")
async def test_auth_routes():
    """
    Endpoint de prueba para verificar que las rutas de autenticación funcionan
    """
    return {"message": "Rutas de autenticación funcionando correctamente"}

@router.post("/login", response_model=TokenResponse)
async def login_endpoint(login_data: LoginRequest, db: AsyncSession = Depends(get_db)):
    """
    Endpoint para autenticación de usuarios
    
    Args:
        login_data: Email y contraseña del usuario
        db: Sesión de base de datos
    
    Returns:
        TokenResponse: Token JWT para acceso autenticado
    """
    logger.info(f"Endpoint de login llamado para: {login_data.email}")
    return await login_user(login_data, db)

@router.post("/register", response_model=TokenResponse)
async def register_endpoint(register_data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    """
    Endpoint para registro de nuevos usuarios
    
    Args:
        register_data: Datos del nuevo usuario
        db: Sesión de base de datos
    
    Returns:
        TokenResponse: Token JWT para acceso autenticado
    """
    logger.info(f"Endpoint de registro llamado para: {register_data.email}")
    return await register_user(register_data, db)

@router.get("/me", response_model=UserInfoResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """
    Endpoint para obtener información completa del usuario autenticado
    
    Args:
        current_user: Usuario actual (extraído del token JWT)
    
    Returns:
        UserInfoResponse: Información completa del usuario con permisos y rutas
    """
    logger.info(f"Endpoint /me llamado para usuario: {current_user['email']}")
    
    # Obtener permisos y rutas disponibles
    permissions = get_user_permissions(current_user["role"])
    available_routes = get_available_routes(current_user["role"])
    
    return UserInfoResponse(
        user_id=current_user["user_id"],
        email=current_user["email"],
        first_name=current_user.get("first_name", ""),
        last_name=current_user.get("last_name", ""),
        role=current_user["role"],
        permissions=permissions,
        available_routes=available_routes
    )

@router.put("/users/{user_id}/role")
async def update_user_role(
    user_id: int,
    role_update: RoleUpdateRequest,
    current_user: dict = Depends(require_admin()),
    db: AsyncSession = Depends(get_db)
):
    """
    Endpoint para que administradores cambien el rol de un usuario
    
    Args:
        user_id: ID del usuario a actualizar
        role_update: Nuevo rol del usuario
        current_user: Usuario administrador actual
        db: Sesión de base de datos
    
    Returns:
        dict: Confirmación de actualización
    """
    from backend.models.user_models import User
    from sqlalchemy.future import select
    
    logger.info(f"Administrador {current_user['email']} intentando cambiar rol de usuario {user_id} a {role_update.role}")
    
    # Buscar usuario
    result = await db.execute(select(User).where(User.user_id == user_id))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Actualizar rol
    user.role = role_update.role.value
    user.updated_by = current_user["email"]
    
    await db.commit()
    await db.refresh(user)
    
    logger.info(f"Rol de usuario {user_id} actualizado a {role_update.role} por {current_user['email']}")
    
    return {
        "message": f"Rol de usuario actualizado exitosamente a {role_update.role}",
        "user_id": user_id,
        "new_role": role_update.role.value
    } 