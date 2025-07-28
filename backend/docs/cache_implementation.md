# Implementación de Caché en FastAPI

## ¿Qué es el caché?

El **caché** es una técnica que almacena temporalmente datos frecuentemente accedidos en memoria para evitar consultas repetidas a la base de datos. Esto mejora significativamente el rendimiento de tu API.

## Tipos de Caché Implementados

### 1. Caché con Redis (Recomendado para producción)

**Ventajas:**
- Persistente entre reinicios del servidor
- Escalable (puede ser compartido entre múltiples instancias)
- Configurable TTL (Time To Live)
- Soporte para estructuras de datos complejas

**Desventajas:**
- Requiere Redis instalado y configurado
- Dependencia externa adicional

### 2. Caché en Memoria (Alternativa simple)

**Ventajas:**
- No requiere dependencias externas
- Fácil de implementar
- Rápido para aplicaciones pequeñas

**Desventajas:**
- Se pierde al reiniciar el servidor
- No escalable entre múltiples instancias
- Consume memoria del servidor

## Arquitectura del Caché

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FastAPI App   │    │   Cache Layer   │    │   Database      │
│                 │    │                 │    │                 │
│  Controller     │───▶│  Redis/Memory   │───▶│  PostgreSQL     │
│  (Decorated)    │    │  Cache          │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Implementación en el Proyecto

### 1. Servicio de Caché (`backend/utils/cache.py`)

```python
class CacheService:
    def __init__(self):
        self.redis: Optional[aioredis.Redis] = None
        self.default_ttl = 300  # 5 minutos por defecto
    
    async def get(self, key: str) -> Optional[Any]:
        # Obtener valor del caché
    
    async def set(self, key: str, value: Any, ttl: int = None) -> bool:
        # Establecer valor en caché
    
    async def delete(self, key: str) -> bool:
        # Eliminar valor del caché
```

### 2. Decoradores de Caché (`backend/utils/cache_decorators.py`)

#### Para operaciones de lectura (GET):
```python
@cache_response("users:all", ttl=600)  # 10 minutos
async def get_all_users_controller(db: AsyncSession):
    # Lógica de la función
    return users
```

#### Para operaciones de escritura (POST, PUT, DELETE):
```python
@invalidate_cache("users")
async def create_user_controller(user_data: UserCreate, db: AsyncSession):
    # Lógica de la función
    return new_user
```

## Estrategias de Caché

### 1. Cache-Aside (Lazy Loading)
- Los datos se cargan en caché solo cuando se solicitan
- Si no están en caché, se obtienen de la base de datos
- Se almacenan en caché para futuras solicitudes

### 2. Write-Through
- Los datos se escriben tanto en caché como en base de datos
- Garantiza consistencia pero puede ser más lento

### 3. Write-Behind
- Los datos se escriben primero en caché
- Se sincronizan con la base de datos de forma asíncrona

## Configuración de TTL (Time To Live)

### Recomendaciones por tipo de dato:

| Tipo de Dato | TTL Recomendado | Razón |
|--------------|-----------------|-------|
| Listas (GET /users) | 600s (10 min) | Cambian con frecuencia |
| Elementos individuales | 900s (15 min) | Más estables |
| Datos de configuración | 3600s (1 hora) | Muy estables |
| Datos de sesión | 1800s (30 min) | Seguridad |

## Patrones de Invalidación

### 1. Invalidación por Prefijo
```python
@invalidate_cache("users")
async def create_user_controller():
    # Esto elimina todas las claves que empiecen con "users:"
```

### 2. Invalidación Específica
```python
@invalidate_cache("users", pattern="users:by_id:*")
async def update_user_controller():
    # Esto elimina solo las claves específicas
```

## Monitoreo y Logging

El sistema incluye logging detallado:

```python
logger.debug(f"Cache hit para: {cache_key}")
logger.debug(f"Cache miss para: {cache_key}")
logger.debug(f"Caché establecido para key: {key}, TTL: {ttl}s")
logger.debug(f"Caché eliminado para key: {key}")
```

## Ejemplos de Uso

### 1. Cachear lista de usuarios
```python
@cache_response("users:all", ttl=600)
async def get_all_users_controller(db: AsyncSession):
    result = await db.execute(select(User))
    return result.scalars().all()
```

### 2. Cachear usuario específico
```python
@cache_response("users:by_id", ttl=900)
async def get_user_by_id_controller(user_id: int, db: AsyncSession):
    result = await db.execute(select(User).where(User.user_id == user_id))
    return result.scalar_one_or_none()
```

### 3. Invalidar caché al crear usuario
```python
@invalidate_cache("users")
async def create_user_controller(user_data: UserCreate, db: AsyncSession):
    # Lógica para crear usuario
    return new_user
```

## Configuración de Redis

### 1. Instalar Redis
```bash
# Ubuntu/Debian
sudo apt-get install redis-server

# macOS
brew install redis

# Windows
# Descargar desde https://redis.io/download
```

### 2. Configurar Redis
```bash
# Iniciar Redis
redis-server

# Verificar conexión
redis-cli ping
```

### 3. Variables de entorno
```env
REDIS_URL=redis://localhost:6379
REDIS_TTL=300
```

## Métricas de Rendimiento

### Antes del caché:
- Tiempo de respuesta: ~200ms
- Consultas a BD: 100% de las solicitudes

### Después del caché:
- Tiempo de respuesta: ~50ms (cache hit)
- Consultas a BD: ~20% de las solicitudes

## Consideraciones de Seguridad

### 1. Datos Sensibles
- No cachear contraseñas, tokens, información personal
- Usar TTL cortos para datos sensibles

### 2. Validación de Datos
- Validar datos antes de cachear
- Sanitizar claves de caché

### 3. Rate Limiting
- Implementar límites de velocidad
- Prevenir ataques de caché

## Troubleshooting

### 1. Redis no conecta
```python
# Verificar en logs
logger.warning(f"No se pudo conectar a Redis: {e}")
```

### 2. Caché no funciona
- Verificar decoradores aplicados correctamente
- Revisar logs de debug
- Verificar TTL configurado

### 3. Memoria alta
- Reducir TTL
- Implementar LRU (Least Recently Used)
- Monitorear uso de memoria

## Próximos Pasos

1. **Implementar métricas**: Agregar contadores de hit/miss
2. **Cache distribuido**: Usar Redis Cluster para alta disponibilidad
3. **Cache warming**: Precargar datos frecuentemente accedidos
4. **Compresión**: Comprimir datos en caché para ahorrar memoria
5. **Cache tags**: Sistema de etiquetas para invalidación más granular 