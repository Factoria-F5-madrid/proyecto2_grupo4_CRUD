# 🏠 PetLand - Sistema de Gestión de Mascotas

Sistema completo de gestión de mascotas con backend en FastAPI y frontend en React, incluyendo un sistema avanzado de roles y permisos (RBAC).

## 📁 Estructura del Proyecto

```
proyecto2_grupo4_CRUD/
├── backend/                    # Backend en FastAPI
│   ├── controllers/           # Controladores de la API
│   ├── models/               # Modelos de base de datos
│   ├── routes/               # Rutas de la API
│   ├── schema/               # Esquemas Pydantic
│   ├── services/             # Servicios de negocio
│   ├── utils/                # Utilidades (auth, cache, etc.)
│   ├── websockets/           # Sistema de WebSockets
│   ├── tests/                # Tests del backend
│   ├── docs/                 # Documentación técnica
│   ├── data/                 # Archivos de datos (Redis, etc.)
│   ├── logs/                 # Archivos de logs
│   ├── main.py               # Punto de entrada de la aplicación
│   ├── pytest.ini           # Configuración de tests
│   └── alembic.ini          # Configuración de migraciones
├── frontend/                  # Frontend en React
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── pages/           # Páginas de la aplicación
│   │   ├── services/        # Servicios de API
│   │   ├── context/         # Contextos de React
│   │   ├── routes/          # Configuración de rutas
│   │   └── config/          # Configuración de la app
├── scripts/                   # Scripts de utilidad
├── alembic/                   # Migraciones de base de datos
├── requirements.txt           # Dependencias de Python
└── README.md                  # Este archivo
```

## 🚀 Funcionalidades

### ✅ **Sistema de Autenticación JWT**
- Login/registro de usuarios
- Tokens JWT seguros
- Hash de contraseñas con bcrypt
- Middleware de autenticación
- Endpoint `/auth/me` para información del usuario

### 🛡️ **Sistema de Roles y Permisos (RBAC)**
- **3 Roles principales**: Admin, Employee, User
- **Permisos granulares** por funcionalidad
- **Navegación dinámica** basada en roles
- **Filtrado de datos** por usuario/rol
- **Autorización automática** en endpoints

### 📊 **Filtrado de Datos por Rol**
- **Admin/Employee**: Acceso completo a todos los datos
- **User**: Solo ve sus propias mascotas, historiales médicos, facturas y servicios
- **Filtrado automático** en backend y frontend
- **Seguridad garantizada** a nivel de API

### 🔌 **WebSockets en Tiempo Real**
- Notificaciones en tiempo real
- Actualizaciones automáticas
- Conexiones por canal
- Gestión de conexiones

### 💾 **Sistema de Caché**
- Redis para almacenamiento en caché
- Decoradores automáticos
- Invalidación inteligente
- Configuración optimizada

### 🛡️ **Manejo de Errores**
- Excepciones personalizadas
- Handlers globales
- Logging mejorado
- Respuestas estandarizadas

### 📊 **Exportación de Datos**
- Exportación CSV de todas las entidades
- Filtros personalizables
- Exportación con relaciones
- Streaming de archivos

### 🧪 **Tests Automatizados**
- Tests unitarios
- Tests de integración
- Tests de caché
- Configuración de pytest

### 👤 **Gestión de Cuenta**
- Información completa del perfil
- Cambio de contraseña
- Visualización de permisos y rutas
- Interfaz moderna y responsive

## 🎯 **SISTEMA DE ROLES Y PERMISOS (RBAC)**

### **Roles Disponibles**

#### 👑 **Administrador (Admin)**
- **Acceso completo** a todas las funcionalidades
- **Gestión de usuarios** y empleados
- **Visualización de todos los datos** del sistema
- **Cambio de roles** de otros usuarios
- **Navegación completa**: Dashboard, Empleados, Usuarios, Mascotas, Reservas, Historial Médico, Facturas, Pagos, Cuenta, Configuración

#### 👨‍💼 **Empleado (Employee)**
- **Gestión de mascotas** y reservas
- **Acceso a historiales médicos** completos
- **Gestión de facturas** y pagos
- **Navegación limitada**: Mascotas, Reservas, Historial Médico, Facturas, Cuenta

#### 👤 **Usuario (User)**
- **Solo sus propias mascotas** y datos relacionados
- **Historial médico** de sus mascotas únicamente
- **Facturas** de sus servicios contratados
- **Servicios** que ha contratado
- **Navegación restringida**: Mascotas, Historial Médico, Facturas, Servicios, Cuenta

### **Permisos Granulares**

```python
# Ejemplo de permisos por rol
ROLE_PERMISSIONS = {
    UserRole.ADMIN: [
        Permission.READ_USERS, Permission.WRITE_USERS,
        Permission.READ_EMPLOYEES, Permission.WRITE_EMPLOYEES,
        Permission.READ_PETS, Permission.WRITE_PETS,
        # ... todos los permisos
    ],
    UserRole.EMPLOYEE: [
        Permission.READ_PETS, Permission.WRITE_PETS,
        Permission.READ_RESERVATIONS, Permission.WRITE_RESERVATIONS,
        # ... permisos limitados
    ],
    UserRole.USER: [
        Permission.READ_OWN_PETS, Permission.WRITE_OWN_PETS,
        Permission.READ_OWN_MEDICAL_HISTORY,
        Permission.READ_OWN_INVOICES,
        # ... permisos propios únicamente
    ]
}
```

### **Navegación Dinámica**

La barra de navegación se adapta automáticamente según el rol del usuario:

- **Admin**: Enlaces completos con "Mi Panel" como texto
- **Employee**: Enlaces limitados con "Panel de Empleado"
- **User**: Enlaces restringidos con "Mi Panel"

### **Filtrado de Datos**

#### **Backend (Nivel API)**
```python
# Ejemplo: Filtrado de mascotas por rol
@router.get("/", response_model=List[PetOut])
async def get_all_pets(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    user_role = UserRole(current_user["role"])
    
    if user_role in [UserRole.ADMIN, UserRole.EMPLOYEE]:
        return await get_all_pets_controller(db)  # Todas las mascotas
    else:
        user_id = current_user["user_id"]
        return await get_pets_by_user_controller(user_id, db)  # Solo sus mascotas
```

#### **Frontend (Nivel UI)**
- **Autenticación automática** en todas las peticiones
- **Interceptores de Axios** para tokens JWT
- **Contexto de autenticación** centralizado
- **Componentes adaptativos** según permisos

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Python 3.8+
- Node.js 16+
- Redis
- PostgreSQL

### Backend
```bash
# Instalar dependencias
pip install -r requirements.txt

# Configurar Redis
./scripts/setup_redis.sh

# Ejecutar migraciones
alembic upgrade head

# Crear usuario administrador (opcional)
python create_admin.py

# Iniciar servidor (opciones)
./scripts/server_utils.sh start    # Script de utilidades (recomendado)
python scripts/start_server.py     # Script directo
uvicorn backend.main:app --reload  # Uvicorn directo
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔧 **Scripts de Utilidad**

### **Gestión del Servidor**
```bash
# Iniciar servidor
./scripts/server_utils.sh start

# Detener servidor
./scripts/server_utils.sh stop

# Reiniciar servidor
./scripts/server_utils.sh restart

# Verificar estado
./scripts/server_utils.sh status

# Ver logs
./scripts/server_utils.sh logs

# Limpiar procesos
./scripts/server_utils.sh clean
```

### **Scripts de Desarrollo**
```bash
# Crear usuario administrador
python create_admin.py

# Ejecutar tests
pytest

# Ejecutar tests con coverage
pytest --cov=backend

# Verificar imports
python -m backend.tests.test_imports
```

## 📊 **Endpoints de la API**

### **Autenticación**
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `GET /auth/me` - Información del usuario actual
- `PUT /auth/users/{user_id}/role` - Cambiar rol (solo admin)

### **Mascotas (Filtrado por Rol)**
- `GET /pets/` - Listar mascotas (filtrado automático)
- `POST /pets/` - Crear mascota
- `GET /pets/{pet_id}` - Obtener mascota específica
- `PUT /pets/{pet_id}` - Actualizar mascota
- `DELETE /pets/{pet_id}` - Eliminar mascota

### **Historial Médico (Filtrado por Rol)**
- `GET /medical-history/` - Listar historiales (filtrado automático)
- `POST /medical-history/` - Crear historial
- `GET /medical-history/{id}` - Obtener historial específico
- `PUT /medical-history/{id}` - Actualizar historial
- `DELETE /medical-history/{id}` - Eliminar historial

### **Servicios (Filtrado por Rol)**
- `GET /services/` - Listar servicios (filtrado automático)
- `POST /services/` - Crear servicio
- `GET /services/{service_id}` - Obtener servicio específico
- `PUT /services/{service_id}` - Actualizar servicio
- `DELETE /services/{service_id}` - Eliminar servicio

### **Facturas (Filtrado por Rol)**
- `GET /invoice/` - Listar facturas (filtrado automático)
- `POST /invoice/` - Crear factura
- `GET /invoice/{invoice_id}` - Obtener factura específica
- `PUT /invoice/{invoice_id}` - Actualizar factura
- `DELETE /invoice/{invoice_id}` - Eliminar factura

### **WebSockets**
- `WS /ws/{channel}` - Conexión general por canal
- `WS /ws/user/{user_id}` - Conexión específica de usuario
- `WS /ws/pets` - Canal de mascotas
- `WS /ws/reservations` - Canal de reservas

### **Exportación**
- `GET /export/users` - Exportar usuarios a CSV
- `GET /export/pets` - Exportar mascotas a CSV
- `GET /export/reservations` - Exportar reservas a CSV
- `GET /export/invoices` - Exportar facturas a CSV

## 🎨 **Interfaz de Usuario**

### **Páginas Principales**
- **Dashboard**: Vista general adaptativa por rol
- **Mascotas**: Gestión con filtrado automático
- **Historial Médico**: Registros médicos filtrados
- **Servicios**: Servicios contratados/disponibles
- **Facturas**: Facturas del usuario/sistema
- **Cuenta**: Gestión de perfil y configuración

### **Características de la UI**
- **Diseño responsive** con Tailwind CSS
- **Iconos específicos** para cada funcionalidad
- **Estados de carga** con spinners animados
- **Manejo de errores** con alertas visuales
- **Formateo profesional** de datos (precios, fechas)
- **Navegación intuitiva** adaptada por rol

## 🔒 **Seguridad**

### **Autenticación**
- Tokens JWT con expiración
- Hash seguro de contraseñas
- Middleware de autenticación global

### **Autorización**
- Verificación de permisos por endpoint
- Filtrado de datos por usuario
- Protección de rutas sensibles

### **Validación**
- Esquemas Pydantic para validación
- Sanitización de datos de entrada
- Manejo seguro de errores

## 🧪 **Testing**

### **Tests Disponibles**
```bash
# Tests de autenticación
pytest backend/tests/test_auth.py

# Tests de caché
pytest backend/tests/test_cache.py

# Tests de importaciones
pytest backend/tests/test_imports.py

# Tests de controladores
pytest backend/tests/test_pet_controller.py
```

### **Cobertura de Tests**
- Tests unitarios para controladores
- Tests de integración para endpoints
- Tests de caché y WebSockets
- Tests de autorización y permisos

## 📈 **Rendimiento**

### **Optimizaciones**
- **Caché Redis** para consultas frecuentes
- **WebSockets** para actualizaciones en tiempo real
- **Paginación** en endpoints de listado
- **Lazy loading** en frontend

### **Monitoreo**
- Logging detallado con niveles
- Métricas de rendimiento
- Trazabilidad de errores

## 🚀 **Despliegue**

### **Requisitos de Producción**
- PostgreSQL 12+
- Redis 6+
- Python 3.8+
- Node.js 16+

### **Variables de Entorno**
```bash
# Base de datos
DATABASE_URL=postgresql://user:pass@localhost/petland

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Servidor
HOST=0.0.0.0
PORT=8000
```

## 🤝 **Contribución**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 **Contacto**

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**PetLand** - Sistema de Gestión de Mascotas con RBAC avanzado 🏠🐾
