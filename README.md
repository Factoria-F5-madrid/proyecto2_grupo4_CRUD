# 🏠 PetLand - Sistema de Gestión de Mascotas

Sistema completo de gestión de mascotas con backend en FastAPI y frontend en React.

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

## 📚 Documentación

- **API Docs**: `http://localhost:8000/docs`
- **WebSockets**: `ws://localhost:8000/ws/{channel}`
- **Documentación técnica**: `backend/docs/`

## 🧪 Tests

```bash
# Ejecutar todos los tests
pytest

# Tests específicos
pytest backend/tests/test_websockets.py
pytest backend/tests/test_cache.py
```

## 🛠️ Utilidades del Servidor

```bash
# Ver todos los comandos disponibles
./scripts/server_utils.sh help

# Gestionar el servidor
./scripts/server_utils.sh start     # Iniciar servidor
./scripts/server_utils.sh stop      # Detener servidor
./scripts/server_utils.sh restart   # Reiniciar servidor
./scripts/server_utils.sh status    # Verificar estado
./scripts/server_utils.sh logs      # Ver logs en tiempo real
./scripts/server_utils.sh clean     # Limpiar procesos
```

## 📝 Logs

Los logs se almacenan en `backend/logs/app.log`

## 🔧 Configuración

- **Variables de entorno**: `.env`
- **Configuración de tests**: `backend/pytest.ini`
- **Migraciones**: `backend/alembic.ini`

## 🤝 Contribución

1. Crear una rama feature
2. Implementar cambios
3. Ejecutar tests
4. Crear pull request

## 📄 Licencia

Este proyecto es parte del bootcamp de IA de Factoría F5.

## 🛡️ **SISTEMA DE ROLES Y PERMISOS (RBAC)**

### 🎭 **Roles Implementados**

#### **1. 👑 ADMIN (Administrador)**
- **Acceso completo** a todas las funcionalidades del sistema
- **CRUD completo** de empleados y usuarios
- **Gestión de roles** y permisos de otros usuarios
- **Configuración del sistema** y logs
- **Exportación de datos** y reportes
- **35 permisos** totales

#### **2. 👨‍💼 EMPLOYEE (Empleado)**
- **CRUD de mascotas** (crear, editar, ver)
- **CRUD de reservas** (gestionar reservas)
- **CRUD de servicios** (ver y actualizar)
- **CRUD de historial médico** (crear y editar)
- **CRUD de facturas** (crear y gestionar)
- **CRUD de pagos** (registrar pagos)
- **Exportación de datos**
- **18 permisos** totales

#### **3. 👤 USER (Cliente/Usuario)**
- **Ver sus propias mascotas** y crear nuevas
- **Crear/editar sus reservas**
- **Ver servicios** disponibles
- **Ver sus facturas y pagos**
- **Ver historial médico** de sus mascotas
- **Crear pagos**
- **11 permisos** totales

### 🔐 **Sistema de Autorización Implementado**

#### **📋 Permisos Granulares**
```python
# Permisos de Usuarios
CREATE_USER, READ_USER, UPDATE_USER, DELETE_USER

# Permisos de Empleados  
CREATE_EMPLOYEE, READ_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE

# Permisos de Mascotas
CREATE_PET, READ_PET, UPDATE_PET, DELETE_PET

# Permisos de Reservas
CREATE_RESERVATION, READ_RESERVATION, UPDATE_RESERVATION, DELETE_RESERVATION

# Permisos de Servicios
CREATE_SERVICE, READ_SERVICE, UPDATE_SERVICE, DELETE_SERVICE

# Permisos de Historial Médico
CREATE_MEDICAL_HISTORY, READ_MEDICAL_HISTORY, UPDATE_MEDICAL_HISTORY, DELETE_MEDICAL_HISTORY

# Permisos de Facturas
CREATE_INVOICE, READ_INVOICE, UPDATE_INVOICE, DELETE_INVOICE

# Permisos de Pagos
CREATE_PAYMENT, READ_PAYMENT, UPDATE_PAYMENT, DELETE_PAYMENT

# Permisos del Sistema
EXPORT_DATA, MANAGE_ROLES, VIEW_LOGS, SYSTEM_CONFIG
```

#### **🛡️ Protección de Endpoints**
```python
# Protección por rol específico
@router.get("/users")
async def get_users(current_user = Depends(require_admin())):
    # Solo administradores

# Protección por permiso específico
@router.get("/pets")
async def get_pets(current_user = Depends(require_permission(Permission.READ_PET))):
    # Cualquiera con permiso de lectura de mascotas

# Protección por múltiples permisos
@router.post("/reservations")
async def create_reservation(current_user = Depends(require_any_permission([
    Permission.CREATE_RESERVATION, Permission.ADMIN_ACCESS
]))):
    # Cualquiera con permiso de crear reservas o acceso admin
```

### 🔑 **Autenticación y Respuestas**

#### **📝 Login/Registro**
```json
POST /auth/login
{
  "email": "usuario@example.com",
  "password": "password123"
}

// Respuesta con información de roles:
{
  "access_token": "jwt_token_here",
  "token_type": "bearer",
  "user_id": 1,
  "email": "usuario@example.com",
  "role": "user",
  "permissions": ["read_pet", "create_pet", "update_pet", ...],
  "available_routes": {
    "dashboard": true,
    "users": false,
    "employees": false,
    "pets": true,
    "reservations": true,
    "services": true,
    "medical_history": true,
    "invoices": true,
    "payments": true,
    "exports": false,
    "admin": false,
    "logs": false,
    "settings": false
  }
}
```

#### **👤 Información del Usuario**
```json
GET /auth/me
Authorization: Bearer <token>

// Respuesta completa:
{
  "user_id": 1,
  "email": "usuario@example.com",
  "first_name": "Juan",
  "last_name": "Pérez",
  "role": "user",
  "permissions": ["read_pet", "create_pet", ...],
  "available_routes": {
    "dashboard": true,
    "pets": true,
    "reservations": true,
    // ... etc
  }
}
```

#### **🔄 Gestión de Roles (Solo Admin)**
```json
PUT /auth/users/{user_id}/role
Authorization: Bearer <admin_token>
{
  "role": "employee"
}

// Respuesta:
{
  "message": "Rol de usuario actualizado exitosamente a UserRole.EMPLOYEE",
  "user_id": 41,
  "new_role": "employee"
}
```

### 📱 **Integración con Frontend**

#### **🎯 Navegación Dinámica**
```javascript
// Después del login, el frontend recibe:
const userInfo = {
  role: "admin", // o "user", "employee"
  permissions: ["create_user", "read_user", ...],
  available_routes: {
    dashboard: true,
    users: true,
    employees: true,
    pets: true,
    // ... etc
  }
}

// Mostrar solo las rutas disponibles
const navigationItems = Object.entries(userInfo.available_routes)
  .filter(([route, available]) => available)
  .map(([route]) => route)
```

#### **🔒 Protección de Componentes**
```javascript
// Verificar permisos antes de mostrar acciones
const canCreateUser = userInfo.permissions.includes('create_user');
const canDeletePet = userInfo.permissions.includes('delete_pet');

// Mostrar/ocultar botones según permisos
{canCreateUser && <Button>Crear Usuario</Button>}
{canDeletePet && <Button>Eliminar Mascota</Button>}
```

### 🧪 **Pruebas del Sistema**

#### **👑 Usuario Administrador**
```
Email: superadmin@petland.com
Password: admin123
Rol: admin
Permisos: 35 permisos completos
Rutas: Acceso total a todas las funcionalidades
```

#### **👨‍💼 Usuario Empleado**
```
Email: user2@example.com (cambiado de user a employee)
Password: test123
Rol: employee
Permisos: 18 permisos de gestión
Rutas: Acceso a gestión sin administración
```

#### **👤 Usuario Normal**
```
Email: user2@example.com (antes del cambio)
Password: test123
Rol: user
Permisos: 11 permisos limitados
Rutas: Acceso solo a sus propios datos
```

### 🏗️ **Arquitectura Técnica**

#### **📁 Archivos Implementados**
- `backend/models/enums.py` - Definición de roles y permisos
- `backend/utils/authorization.py` - Sistema de autorización
- `backend/schema/auth_schema.py` - Schemas de autenticación
- `backend/controllers/auth_controller.py` - Controlador de auth
- `backend/routes/auth_routes.py` - Rutas de autenticación

#### **🔧 Componentes Clave**
- **`AuthorizationService`** - Servicio estático para verificación de permisos
- **`require_admin()`** - Dependencia para endpoints solo de admin
- **`require_permission()`** - Dependencia para permisos específicos
- **`get_user_permissions()`** - Utilidad para obtener permisos de un rol
- **`get_available_routes()`** - Utilidad para obtener rutas disponibles

### 🎯 **Beneficios del Sistema**

1. **🛡️ Seguridad Granular**: Control preciso de permisos por endpoint
2. **🎭 Roles Claros**: ADMIN, EMPLOYEE, USER bien definidos
3. **📱 Frontend Dinámico**: Navegación adaptativa según rol
4. **🔧 Fácil Mantenimiento**: Permisos centralizados y organizados
5. **📈 Escalabilidad**: Fácil agregar nuevos roles y permisos
6. **🔄 Flexibilidad**: Cambio de roles en tiempo real
7. **📊 Transparencia**: Información completa de permisos en cada respuesta

## 🖥️ **DASHBOARD DEL ADMINISTRADOR**

### 🎛️ **Panel de Control Dinámico**

El sistema incluye un dashboard completamente dinámico que se adapta automáticamente según el rol del usuario autenticado.

#### **👑 Dashboard de Administrador**
- **Estadísticas completas** del sistema
- **Tarjetas interactivas** para cada sección
- **Acciones rápidas** para todas las funcionalidades
- **Gestión total** del sistema PetLand

#### **👨‍💼 Dashboard de Empleado**
- **Estadísticas de gestión** (sin datos administrativos)
- **Acceso a herramientas** de gestión de mascotas y reservas
- **Sin acceso** a configuración del sistema

#### **👤 Dashboard de Usuario**
- **Mensaje de bienvenida** personalizado
- **Acceso limitado** a sus propias funcionalidades
- **Interfaz simplificada** y amigable

### 🧭 **Navegación Dinámica**

#### **📋 Menú de Navegación**
El navbar se adapta automáticamente según los permisos del usuario:

```javascript
// Configuración de navegación basada en roles
const navigationItems = [
  { label: "Dashboard", show: true },           // Siempre visible
  { label: "Usuarios", show: hasRouteAccess('users') && isAdmin() },      // Solo admin
  { label: "Empleados", show: hasRouteAccess('employees') && isAdmin() },  // Solo admin
  { label: "Mascotas", show: hasRouteAccess('pets') },                     // Admin y empleados
  { label: "Reservas", show: hasRouteAccess('reservations') },             // Admin y empleados
  { label: "Historial Médico", show: hasRouteAccess('medical_history') },  // Admin y empleados
  { label: "Pagos", show: hasRouteAccess('payments') },                    // Admin y empleados
  { label: "Facturas", show: hasRouteAccess('invoices') },                 // Admin y empleados
  { label: "Cuenta", show: true },              // Siempre visible
  { label: "Configuración", show: hasRouteAccess('settings') && isAdmin() } // Solo admin
];
```

#### **👥 Roles y Navegación**

**👑 Administrador:**
- **Panel**: "Admin Panel"
- **Enlaces**: Todos los enlaces disponibles
- **Funcionalidades**: Acceso completo a todas las secciones

**👨‍💼 Empleado:**
- **Panel**: "Employee Panel" 
- **Enlaces**: Mascotas, Reservas, Historial Médico, Pagos, Facturas, Cuenta
- **Funcionalidades**: Gestión de mascotas, reservas, historial médico, pagos y facturas (sin acceso a administración)

**👤 Usuario Regular:**
- **Panel**: "Your Pets"
- **Enlaces**: Solo mascotas, reservas, pagos y cuenta
- **Funcionalidades**: Gestión de sus propias mascotas y reservas

#### **🎨 Elementos del Navbar**
- **Logo de PetLand** con colapso/expansión
- **Enlaces dinámicos** según permisos del usuario
- **Información del usuario** con rol mostrado
- **Botón de logout** funcional
- **Interfaz en español** para mejor UX

### 📊 **Páginas de Administración**

#### **👥 Gestión de Usuarios (`/users`)**
- **Tabla completa** con todos los usuarios del sistema
- **Búsqueda avanzada** por nombre, email, rol
- **Estadísticas** de distribución de roles
- **Acciones CRUD** protegidas por permisos
- **Iconos visuales** para identificar roles

#### **👨‍💼 Gestión de Empleados (`/employees`)**
- **Lista completa** del personal de PetLand
- **Información de contacto** (email, teléfono)
- **Posición y departamento** de cada empleado
- **Estadísticas** de empleados activos
- **Gestión completa** del personal

### 🎯 **Características del Dashboard**

#### **📈 Estadísticas Adaptativas**
```javascript
// Estadísticas que se muestran según el rol
const dashboardCards = [
  { title: "Usuarios", show: hasRouteAccess('users') },
  { title: "Empleados", show: hasRouteAccess('employees') },
  { title: "Mascotas", show: hasRouteAccess('pets') },
  { title: "Reservas", show: hasRouteAccess('reservations') },
  { title: "Pagos", show: hasRouteAccess('payments') },
  { title: "Facturas", show: hasRouteAccess('invoices') }
];
```

#### **⚡ Acciones Rápidas**
- **Añadir Mascota** - Acceso directo al formulario
- **Nueva Reserva** - Navegación a reservas
- **Historial Médico** - Acceso al historial
- **Configuración** - Panel de configuración

#### **🎨 Interfaz Responsiva**
- **Diseño adaptativo** para diferentes pantallas
- **Colores temáticos** por sección
- **Iconos intuitivos** para cada funcionalidad
- **Transiciones suaves** entre estados

### 🔧 **Componentes Frontend Implementados**

#### **📁 Archivos Creados/Modificados**
- `frontend/src/context/AuthContext.jsx` - Contexto con funciones de autorización
- `frontend/src/components/Nav/Nav.jsx` - Navbar dinámico
- `frontend/src/pages/Home.jsx` - Dashboard adaptativo
- `frontend/src/pages/Users.jsx` - Gestión de usuarios
- `frontend/src/pages/Employees.jsx` - Gestión de empleados
- `frontend/src/services/employeeServices.js` - Servicios de empleados
- `frontend/src/routes/Routes.jsx` - Rutas actualizadas

#### **🎛️ Funciones de Autorización**
```javascript
// Funciones disponibles en el contexto de autenticación
const { 
  hasPermission,      // Verificar permiso específico
  hasRouteAccess,     // Verificar acceso a ruta
  isAdmin,           // Verificar si es administrador
  isEmployee,        // Verificar si es empleado
  isUser             // Verificar si es usuario normal
} = useAuth();
```

### 🚀 **Cómo Probar el Dashboard**

#### **🧪 Verificación de Navegación por Roles**

**Pruebas realizadas exitosamente:**

1. **👑 Administrador** (`superadmin@petland.com` / `admin123`)
   - ✅ **Rol**: `admin`
   - ✅ **Rutas disponibles**: `users: true, employees: true, pets: true, reservations: true, medical_history: true, invoices: true, payments: true, settings: true`
   - ✅ **Panel**: "Admin Panel"
   - ✅ **Enlaces visibles**: Todos los enlaces

2. **👨‍💼 Empleado** (`user2@example.com` / `test123`)
   - ✅ **Rol**: `employee`
   - ✅ **Rutas disponibles**: `pets: true, reservations: true, medical_history: true, invoices: true, payments: true`
   - ✅ **Rutas NO disponibles**: `users: false, employees: false, settings: false`
   - ✅ **Panel**: "Employee Panel"
   - ✅ **Enlaces visibles**: Solo gestión (sin administración)

3. **👤 Usuario Regular** (`usuario3@example.com` / `test123`)
   - ✅ **Rol**: `user`
   - ✅ **Rutas disponibles**: `pets: true, reservations: true, payments: true`
   - ✅ **Rutas NO disponibles**: `users: false, employees: false, medical_history: false, invoices: false, settings: false`
   - ✅ **Panel**: "Your Pets"
   - ✅ **Enlaces visibles**: Solo funcionalidades básicas

#### **👑 Como Administrador**
1. **Login**: `superadmin@petland.com` / `admin123`
2. **Ver dashboard** con todas las estadísticas
3. **Navegar** por todas las secciones disponibles
4. **Gestionar** usuarios y empleados
5. **Acceder** a configuración del sistema

#### **👨‍💼 Como Empleado**
1. **Login**: `user2@example.com` / `test123` (después del cambio de rol)
2. **Ver dashboard** con estadísticas de gestión
3. **Acceder** a mascotas, reservas, historial médico
4. **Sin acceso** a usuarios ni configuración

#### **👤 Como Usuario Normal**
1. **Login**: `user2@example.com` / `test123` (antes del cambio)
2. **Ver dashboard** simple con mensaje de bienvenida
3. **Acceso limitado** a sus propias funcionalidades
4. **Interfaz simplificada** y amigable
