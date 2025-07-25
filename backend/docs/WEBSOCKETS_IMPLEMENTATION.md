# Implementación de WebSockets para Actualizaciones en Tiempo Real

## Descripción General

Esta implementación proporciona actualizaciones en tiempo real para el sistema de gestión de mascotas PetLand usando WebSockets. El backend está preparado para enviar notificaciones instantáneas sobre cambios en mascotas, reservas, pagos, facturas y otros elementos del sistema.

## Arquitectura

### Backend (FastAPI)

#### Estructura de Archivos
```
backend/websockets/
├── __init__.py
├── manager.py          # Gestor de conexiones WebSocket
├── routes.py           # Rutas de WebSocket
└── notifications.py    # Servicio de notificaciones
```

#### Componentes Principales

1. **ConnectionManager** (`manager.py`)
   - Maneja todas las conexiones WebSocket activas
   - Organiza conexiones por canales (users, pets, reservations, etc.)
   - Proporciona métodos para enviar mensajes a canales específicos

2. **Rutas WebSocket** (`routes.py`)
   - Endpoints para diferentes tipos de conexiones
   - Manejo de conexión/desconexión
   - Procesamiento de mensajes entrantes

3. **NotificationService** (`notifications.py`)
   - Envía notificaciones específicas por tipo de entidad
   - Integración con controladores existentes
   - Formato estandarizado de mensajes

## Canales Disponibles

### Backend
- `users` - Notificaciones específicas de usuarios
- `pets` - Actualizaciones de mascotas
- `reservations` - Actualizaciones de reservas
- `payments` - Actualizaciones de pagos
- `invoices` - Actualizaciones de facturas
- `medical_history` - Actualizaciones de historial médico
- `services` - Actualizaciones de servicios
- `employees` - Actualizaciones de empleados
- `activity_logs` - Actualizaciones de logs de actividad



## Uso

### Backend

#### 1. Enviar Notificación a Usuario Específico
```python
from backend.websockets.notifications import notification_service

# Enviar notificación de éxito
await notification_service.send_success_notification(
    user_id="123", 
    success_message="Mascota creada exitosamente"
)

# Enviar notificación de error
await notification_service.send_error_notification(
    user_id="123", 
    error_message="Error al crear mascota"
)
```

#### 2. Enviar Actualización en Tiempo Real
```python
# Actualización de mascota
await notification_service.send_pet_update("created", {
    "pet_id": 1,
    "name": "Luna",
    "species": "Perro",
    "breed": "Golden Retriever",
    "age": 3,
    "user_id": 123
})

# Actualización de reserva
await notification_service.send_reservation_update("updated", {
    "reservation_id": 1,
    "user_id": 123,
    "service_id": 1,
    "checkin_date": "2024-01-15T10:00:00",
    "checkout_date": "2024-01-15T12:00:00",
    "status": "confirmed"
})
```



## Formato de Mensajes

### Notificaciones
```json
{
    "type": "notification",
    "notification_type": "pet_created",
    "user_id": "123",
    "data": {
        "pet_name": "Luna",
        "pet_id": 1
    },
    "timestamp": "2024-01-15T10:30:00"
}
```

### Actualizaciones en Tiempo Real
```json
{
    "type": "realtime_update",
    "entity_type": "pets",
    "action": "created",
    "data": {
        "pet_id": 1,
        "name": "Luna",
        "species": "Perro",
        "breed": "Golden Retriever",
        "age": 3,
        "user_id": 123
    },
    "timestamp": "2024-01-15T10:30:00"
}
```

## Configuración

### Backend
1. Instalar dependencias:
```bash
pip install websockets==12.0
```

2. Las rutas de WebSocket se incluyen automáticamente en `main.py`



## Características

### Reconexión Automática
- Intento de reconexión automática en caso de desconexión
- Máximo 5 intentos con delay exponencial
- Solo para desconexiones no intencionales

### Manejo de Errores
- Logging detallado de errores
- Notificaciones de error al usuario
- Recuperación automática cuando es posible

### Rendimiento
- Conexiones por canal para optimizar recursos
- Limpieza automática de conexiones desconectadas
- Manejo eficiente de múltiples conexiones

### Seguridad
- Validación de mensajes entrantes
- Sanitización de datos
- Logging de actividades sospechosas

## Pruebas

### Backend
```bash
# Probar conexión WebSocket
curl -i -N -H "Connection: Upgrade" -H "Upgrade: websocket" -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==" http://localhost:8000/ws/pets
```



## Monitoreo

### Backend
- Logs de conexión/desconexión
- Contadores de mensajes por canal
- Métricas de rendimiento



## Troubleshooting

### Problemas Comunes

1. **Conexión rechazada**
   - Verificar que el servidor esté ejecutándose
   - Verificar la URL del WebSocket
   - Verificar configuración de CORS

2. **Mensajes no recibidos**
   - Verificar que el canal esté correcto
   - Verificar el formato del mensaje
   - Verificar logs del servidor

3. **Reconexión fallida**
   - Verificar conectividad de red
   - Verificar configuración del servidor
   - Verificar logs de error

### Debugging

1. **Backend**
```python
# Agregar logging detallado
import logging
logging.basicConfig(level=logging.DEBUG)
```



## Futuras Mejoras

1. **Autenticación WebSocket**
   - Tokens JWT en conexiones WebSocket
   - Validación de permisos por canal

2. **Persistencia de Mensajes**
   - Almacenamiento de mensajes offline
   - Sincronización cuando se reconecta

3. **Escalabilidad**
   - Redis para múltiples instancias
   - Load balancing de WebSockets

4. **Funcionalidades Avanzadas**
   - Chat en tiempo real
   - Notificaciones push
   - Streaming de datos 