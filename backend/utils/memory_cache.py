from functools import lru_cache, wraps
from typing import Any, Callable, Optional
import time
from backend.logger.logger import logger

class MemoryCache:
   
    
    def __init__(self):
        self._cache = {}
        self._timestamps = {}
    
    def get(self, key: str) -> Optional[Any]:
    
        if key in self._cache:
          
            if time.time() - self._timestamps[key] < 300:  # 5 minutos TTL
                logger.debug(f"Memory cache hit para: {key}")
                return self._cache[key]
            else:
               
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


memory_cache = MemoryCache()

def memory_cache_response(prefix: str, ttl: int = 300):
   
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
           
            cache_key = f"{prefix}:{hash(str(kwargs))}"
            
     
            cached_result = memory_cache.get(cache_key)
            if cached_result is not None:
                return cached_result
            
       
            logger.debug(f"Memory cache miss para: {cache_key}")
            result = await func(*args, **kwargs)
            
            
            memory_cache.set(cache_key, result, ttl)
            
            return result
        return wrapper
    return decorator

def invalidate_memory_cache(prefix: str):
   
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
        
            result = await func(*args, **kwargs)
            
         
            memory_cache.clear()
            logger.debug(f"Memory cache invalidado para prefijo: {prefix}")
            return result
        return wrapper
    return decorator


def lru_cache_response(maxsize: int = 128, ttl: int = 300):
  
    def decorator(func: Callable) -> Callable:
    
        cached_func = lru_cache(maxsize=maxsize)(func)
        
        @wraps(func)
        async def wrapper(*args, **kwargs):
           
            cache_key = (args, tuple(sorted(kwargs.items())))
            return await cached_func(*cache_key)
        
        return wrapper
    return decorator 