from functools import lru_cache, wraps
from typing import Any, Callable, Optional
import time
from backend.logger.logger import logger

class MemoryCache:
    """Caché en memoria simple usando diccionarios"""
    
    def __init__(self):
        self._cache = {}
        self._timestamps = {}
    
    def get(self, key: str) -> Optional[Any]:
        """Obtener valor del caché"""
        if key in self._cache:
            # Verificar si no ha expirado
            if time.time() - self._timestamps[key] < 300:  # 5 minutos TTL
                logger.debug(f"Memory cache hit para: {key}")
                return self._cache[key]
            else:
                # Eliminar entrada expirada
                del self._cache[key]
                del self._timestamps[key]
        return None
    
    def set(self, key: str, value: Any, ttl: int = 300) -> None:
        """Establecer valor en caché"""
        self._cache[key] = value
        self._timestamps[key] = time.time()
        logger.debug(f"Memory cache set para: {key}, TTL: {ttl}s")
    
    def delete(self, key: str) -> None:
        """Eliminar valor del caché"""
        if key in self._cache:
            del self._cache[key]
            del self._timestamps[key]
            logger.debug(f"Memory cache eliminado para: {key}")
    
    def clear(self) -> None:
        """Limpiar todo el caché"""
        self._cache.clear()
        self._timestamps.clear()
        logger.info("Memory cache limpiado")

# Instancia global del caché en memoria
memory_cache = MemoryCache()

def memory_cache_response(prefix: str, ttl: int = 300):
    """
    Decorador para cachear respuestas en memoria
    
    Args:
        prefix: Prefijo para la clave del caché
        ttl: Tiempo de vida en segundos (default: 300)
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Generar clave de caché
            cache_key = f"{prefix}:{hash(str(kwargs))}"
            
            # Intentar obtener del caché
            cached_result = memory_cache.get(cache_key)
            if cached_result is not None:
                return cached_result
            
            # Si no está en caché, ejecutar función
            logger.debug(f"Memory cache miss para: {cache_key}")
            result = await func(*args, **kwargs)
            
            # Guardar en caché
            memory_cache.set(cache_key, result, ttl)
            
            return result
        return wrapper
    return decorator

def invalidate_memory_cache(prefix: str):
    """
    Decorador para invalidar caché en memoria después de operaciones de escritura
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Ejecutar función original
            result = await func(*args, **kwargs)
            
            # Limpiar caché relacionado (simplificado)
            memory_cache.clear()
            logger.debug(f"Memory cache invalidado para prefijo: {prefix}")
            return result
        return wrapper
    return decorator

# Decorador usando lru_cache de Python (más simple)
def lru_cache_response(maxsize: int = 128, ttl: int = 300):
    """
    Decorador usando lru_cache de Python para cachear respuestas
    
    Args:
        maxsize: Número máximo de entradas en caché
        ttl: Tiempo de vida en segundos (nota: lru_cache no tiene TTL nativo)
    """
    def decorator(func: Callable) -> Callable:
        # Crear caché LRU para esta función
        cached_func = lru_cache(maxsize=maxsize)(func)
        
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Convertir argumentos a tupla para que sean hashables
            cache_key = (args, tuple(sorted(kwargs.items())))
            return await cached_func(*cache_key)
        
        return wrapper
    return decorator 