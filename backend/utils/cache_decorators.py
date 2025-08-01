from functools import wraps
from typing import Callable, Any, Optional
from backend.utils.cache import cache_service
from backend.logger.logger import logger

def cache_response(prefix: str, ttl: int = 300, key_params: Optional[list] = None):
   
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
          
            cache_key = cache_service.generate_key(prefix, **kwargs)
            
          
            cached_result = await cache_service.get(cache_key)
            if cached_result is not None:
                logger.debug(f"Cache hit para: {cache_key}")
                return cached_result
            
       
            logger.debug(f"Cache miss para: {cache_key}")
            result = await func(*args, **kwargs)
            
           
            await cache_service.set(cache_key, result, ttl)
            
            return result
        return wrapper
    return decorator

def invalidate_cache(prefix: str, pattern: Optional[str] = None):
   
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
          
            result = await func(*args, **kwargs)
            
        
            if pattern:
                await cache_service.delete_pattern(pattern)
            else:
                await cache_service.delete_pattern(f"{prefix}:*")
            
            logger.debug(f"Caché invalidado para prefijo: {prefix}")
            return result
        return wrapper
    return decorator

def cache_with_conditional_invalidation(prefix: str, ttl: int = 300):
   
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            
            if func.__name__.startswith('get_'):
                cache_key = cache_service.generate_key(prefix, **kwargs)
                cached_result = await cache_service.get(cache_key)
                if cached_result is not None:
                    logger.debug(f"Cache hit para: {cache_key}")
                    return cached_result
                
                result = await func(*args, **kwargs)
                await cache_service.set(cache_key, result, ttl)
                return result
        
            else:
                result = await func(*args, **kwargs)
                # Invalidar caché relacionado
                await cache_service.delete_pattern(f"{prefix}:*")
                logger.debug(f"Caché invalidado para prefijo: {prefix}")
                return result
                
        return wrapper
    return decorator 