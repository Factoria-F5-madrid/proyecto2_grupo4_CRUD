from functools import wraps
from typing import Callable, Any, Optional
from backend.utils.cache import cache_service
from backend.logger.logger import logger

def cache_response(prefix: str, ttl: int = 300, key_params: Optional[list] = None):
    """
    Decorador para cachear respuestas de funciones
    
    Args:
        prefix: Prefijo para la clave del caché
        ttl: Tiempo de vida en segundos (default: 300)
        key_params: Lista de nombres de parámetros a incluir en la clave
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Generar clave de caché
            cache_key = cache_service.generate_key(prefix, **kwargs)
            
            # Intentar obtener del caché
            cached_result = await cache_service.get(cache_key)
            if cached_result is not None:
                logger.debug(f"Cache hit para: {cache_key}")
                return cached_result
            
            # Si no está en caché, ejecutar función
            logger.debug(f"Cache miss para: {cache_key}")
            result = await func(*args, **kwargs)
            
            # Guardar en caché
            await cache_service.set(cache_key, result, ttl)
            
            return result
        return wrapper
    return decorator

def invalidate_cache(prefix: str, pattern: Optional[str] = None):
    """
    Decorador para invalidar caché después de operaciones de escritura
    
    Args:
        prefix: Prefijo para eliminar claves relacionadas
        pattern: Patrón específico para eliminar (opcional)
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Ejecutar función original
            result = await func(*args, **kwargs)
            
            # Invalidar caché
            if pattern:
                await cache_service.delete_pattern(pattern)
            else:
                await cache_service.delete_pattern(f"{prefix}:*")
            
            logger.debug(f"Caché invalidado para prefijo: {prefix}")
            return result
        return wrapper
    return decorator

def cache_with_conditional_invalidation(prefix: str, ttl: int = 300):
    """
    Decorador que cachea respuestas pero invalida caché relacionado después de escrituras
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Para operaciones de lectura (GET)
            if func.__name__.startswith('get_'):
                cache_key = cache_service.generate_key(prefix, **kwargs)
                cached_result = await cache_service.get(cache_key)
                if cached_result is not None:
                    logger.debug(f"Cache hit para: {cache_key}")
                    return cached_result
                
                result = await func(*args, **kwargs)
                await cache_service.set(cache_key, result, ttl)
                return result
            
            # Para operaciones de escritura (POST, PUT, DELETE)
            else:
                result = await func(*args, **kwargs)
                # Invalidar caché relacionado
                await cache_service.delete_pattern(f"{prefix}:*")
                logger.debug(f"Caché invalidado para prefijo: {prefix}")
                return result
                
        return wrapper
    return decorator 