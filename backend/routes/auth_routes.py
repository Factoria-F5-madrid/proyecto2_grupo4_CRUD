from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from backend.schema.auth_schema import LoginRequest, RegisterRequest, TokenResponse
from backend.controllers.auth_controller import login_user, register_user
from backend.utils.auth_jwt import get_current_user
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

@router.get("/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """
    Endpoint para obtener información del usuario autenticado
    
    Args:
        current_user: Usuario actual (extraído del token JWT)
    
    Returns:
        dict: Información del usuario autenticado
    """
    logger.info(f"Endpoint /me llamado para usuario: {current_user['email']}")
    return {
        "user_id": current_user["user_id"],
        "email": current_user["email"],
        "role": current_user["role"],
        "message": "Usuario autenticado correctamente"
    } 