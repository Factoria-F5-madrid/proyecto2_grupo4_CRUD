import json
import pickle
from typing import Any, Optional, Union
import redis.asyncio as redis
from fastapi import Depends
from backend.logger.logger import logger

class CacheService:
    def __init__(self):
        self.redis: Optional[redis.Redis] = None
        self.default_ttl = 300  
    
    async def connect(self):
      
        try:
            if self.redis is None:
                self.redis = redis.from_url(
                    "redis://localhost:6379",
                    encoding="utf-8",
                    decode_responses=True
                )
            await self.redis.ping()
            logger.info("Conectado a Redis exitosamente")
        except Exception as e:
            logger.warning(f"No se pudo conectar a Redis: {e}")
            self.redis = None
    
    async def disconnect(self):
       
        if self.redis:
            try:
                await self.redis.aclose()
            except Exception as e:
                logger.error(f"Error cerrando conexión Redis: {e}")
            finally:
                self.redis = None
    
    async def get(self, key: str) -> Optional[Any]:
      
        if not self.redis:
            return None
        
        try:
            value = await self.redis.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            logger.error(f"Error obteniendo caché para key {key}: {e}")
            return None
    
    async def set(self, key: str, value: Any, ttl: int = None) -> bool:
       
        if not self.redis:
            return False
        
        try:
            ttl = ttl or self.default_ttl
            await self.redis.setex(key, ttl, json.dumps(value))
            logger.debug(f"Caché establecido para key: {key}, TTL: {ttl}s")
            return True
        except Exception as e:
            logger.error(f"Error estableciendo caché para key {key}: {e}")
            return False
    
    async def delete(self, key: str) -> bool:
 
        if not self.redis:
            return False
        
        try:
            await self.redis.delete(key)
            logger.debug(f"Caché eliminado para key: {key}")
            return True
        except Exception as e:
            logger.error(f"Error eliminando caché para key {key}: {e}")
            return False
    
    async def delete_pattern(self, pattern: str) -> bool:
      
        if not self.redis:
            return False
        
        try:
            keys = await self.redis.keys(pattern)
            if keys:
                await self.redis.delete(*keys)
                logger.debug(f"Eliminadas {len(keys)} claves con patrón: {pattern}")
            return True
        except Exception as e:
            logger.error(f"Error eliminando caché con patrón {pattern}: {e}")
            return False
    
    def generate_key(self, prefix: str, **kwargs) -> str:
       
        key_parts = [prefix]
        for k, v in sorted(kwargs.items()):
            key_parts.append(f"{k}:{v}")
        return ":".join(key_parts)


cache_service = CacheService()

async def get_cache_service() -> CacheService:
    """Dependency para obtener el servicio de caché"""
    return cache_service 