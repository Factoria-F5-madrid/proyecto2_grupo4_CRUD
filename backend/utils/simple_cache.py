"""
Caché simplificado para FastAPI
"""
import json
import asyncio
from typing import Any, Optional, Callable
import redis.asyncio as redis
from functools import wraps
from datetime import datetime
from backend.logger.logger import logger

class SimpleCache:
    """Caché simple y directo"""
    
    def __init__(self):
        self.redis_client = None
        self.default_ttl = 300
    
    async def get_redis(self):
        """Obtener cliente Redis"""
        if self.redis_client is None:
            try:
                self.redis_client = redis.from_url(
                    "redis://localhost:6379",
                    decode_responses=True
                )
                await self.redis_client.ping()
                logger.info("✅ Redis conectado")
            except Exception as e:
                logger.warning(f"❌ No se pudo conectar a Redis: {e}")
                return None
        return self.redis_client
    
    async def get(self, key: str) -> Optional[Any]:
        """Obtener valor del caché"""
        client = await self.get_redis()
        if not client:
            return None
        
        try:
            value = await client.get(key)
            if value:
                logger.debug(f"🎯 Cache HIT: {key}")
                return json.loads(value)
            logger.debug(f"❌ Cache MISS: {key}")
            return None
        except Exception as e:
            logger.error(f"Error obteniendo caché {key}: {e}")
            return None
    
    async def set(self, key: str, value: Any, ttl: int = None) -> bool:
        """Establecer valor en caché"""
        client = await self.get_redis()
        if not client:
            return False
        
        try:
            ttl = ttl or self.default_ttl
            
            # Convertir objetos SQLAlchemy a diccionarios
            if hasattr(value, '__iter__') and not isinstance(value, (str, bytes, dict)):
                # Si es una lista de objetos SQLAlchemy
                serializable_value = []
                for item in value:
                    if hasattr(item, '__dict__'):
                        # Convertir objeto SQLAlchemy a diccionario
                        item_dict = {}
                        for attr in item.__dict__:
                            if not attr.startswith('_'):
                                attr_value = getattr(item, attr)
                                # Convertir datetime a string
                                if isinstance(attr_value, datetime):
                                    attr_value = attr_value.isoformat()
                                item_dict[attr] = attr_value
                        serializable_value.append(item_dict)
                    else:
                        serializable_value.append(item)
            elif hasattr(value, '__dict__'):
                # Si es un objeto SQLAlchemy individual
                serializable_value = {}
                for attr in value.__dict__:
                    if not attr.startswith('_'):
                        attr_value = getattr(value, attr)
                        # Convertir datetime a string
                        if isinstance(attr_value, datetime):
                            attr_value = attr_value.isoformat()
                        serializable_value[attr] = attr_value
            else:
                serializable_value = value
            
            await client.setex(key, ttl, json.dumps(serializable_value))
            logger.debug(f"💾 Cache SET: {key} (TTL: {ttl}s)")
            return True
        except Exception as e:
            logger.error(f"Error estableciendo caché {key}: {e}")
            return False
    
    async def delete(self, pattern: str) -> bool:
        """Eliminar claves que coincidan con patrón"""
        client = await self.get_redis()
        if not client:
            return False
        
        try:
            keys = await client.keys(pattern)
            if keys:
                await client.delete(*keys)
                logger.debug(f"🗑️ Cache DELETE: {len(keys)} claves con patrón {pattern}")
            return True
        except Exception as e:
            logger.error(f"Error eliminando caché {pattern}: {e}")
            return False

# Instancia global
cache = SimpleCache()

def cache_response(prefix: str, ttl: int = 300):
    """Decorador simplificado para cachear respuestas"""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Generar clave única
            cache_key = f"{prefix}:{hash(str(args) + str(sorted(kwargs.items())))}"
            
            # Intentar obtener del caché
            cached_result = await cache.get(cache_key)
            if cached_result is not None:
                return cached_result
            
            # Ejecutar función y cachear resultado
            result = await func(*args, **kwargs)
            await cache.set(cache_key, result, ttl)
            
            return result
        return wrapper
    return decorator

def invalidate_cache(prefix: str):
    """Decorador para invalidar caché"""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Ejecutar función
            result = await func(*args, **kwargs)
            
            # Invalidar caché
            await cache.delete(f"{prefix}:*")
            
            return result
        return wrapper
    return decorator 