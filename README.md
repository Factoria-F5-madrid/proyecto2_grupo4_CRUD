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

### **🎯 Descripción General**
Sistema completo de control de acceso basado en roles que permite gestionar permisos de manera granular y segura.

### **👥 Roles Definidos**

#### **🔴 Administrador (Admin)**
- **Acceso completo** a todas las funcionalidades del sistema
- **Gestión de usuarios** y empleados
- **Configuración del sistema**
- **Visualización de logs** y estadísticas
- **Exportación de datos**

#### **🟡 Empleado (Employee)**
- **Gestión de mascotas** y reservas
- **Acceso a historial médico**
- **Gestión de pagos** y facturas
- **Sin acceso** a configuración del sistema

#### **🟢 Usuario Regular (User)**
- **Solo sus propias mascotas**
- **Solo sus reservas**
- **Solo su historial médico**
- **Solo sus facturas** y pagos
- **Sin acceso** a gestión de empleados

### **🔐 Permisos Granulares**

```python
# Ejemplo de permisos por rol
ROLE_PERMISSIONS = {
    UserRole.ADMIN: [
        Permission.CREATE_USER, Permission.READ_USER, Permission.UPDATE_USER, Permission.DELETE_USER,
        Permission.CREATE_EMPLOYEE, Permission.READ_EMPLOYEE, Permission.UPDATE_EMPLOYEE, Permission.DELETE_EMPLOYEE,
        Permission.CREATE_PET, Permission.READ_PET, Permission.UPDATE_PET, Permission.DELETE_PET,
        Permission.CREATE_RESERVATION, Permission.READ_RESERVATION, Permission.UPDATE_RESERVATION, Permission.DELETE_RESERVATION,
        Permission.CREATE_SERVICE, Permission.READ_SERVICE, Permission.UPDATE_SERVICE, Permission.DELETE_SERVICE,
        Permission.CREATE_MEDICAL_HISTORY, Permission.READ_MEDICAL_HISTORY, Permission.UPDATE_MEDICAL_HISTORY, Permission.DELETE_MEDICAL_HISTORY,
        Permission.CREATE_INVOICE, Permission.READ_INVOICE, Permission.UPDATE_INVOICE, Permission.DELETE_INVOICE,
        Permission.CREATE_PAYMENT, Permission.READ_PAYMENT, Permission.UPDATE_PAYMENT, Permission.DELETE_PAYMENT,
        Permission.EXPORT_DATA, Permission.MANAGE_ROLES, Permission.VIEW_LOGS, Permission.SYSTEM_CONFIG
    ],
    UserRole.EMPLOYEE: [
        Permission.READ_USER, Permission.READ_EMPLOYEE,
        Permission.CREATE_PET, Permission.READ_PET, Permission.UPDATE_PET, Permission.DELETE_PET,
        Permission.CREATE_RESERVATION, Permission.READ_RESERVATION, Permission.UPDATE_RESERVATION, Permission.DELETE_RESERVATION,
        Permission.CREATE_SERVICE, Permission.READ_SERVICE, Permission.UPDATE_SERVICE, Permission.DELETE_SERVICE,
        Permission.CREATE_MEDICAL_HISTORY, Permission.READ_MEDICAL_HISTORY, Permission.UPDATE_MEDICAL_HISTORY, Permission.DELETE_MEDICAL_HISTORY,
        Permission.CREATE_INVOICE, Permission.READ_INVOICE, Permission.UPDATE_INVOICE, Permission.DELETE_INVOICE,
        Permission.CREATE_PAYMENT, Permission.READ_PAYMENT, Permission.UPDATE_PAYMENT, Permission.DELETE_PAYMENT
    ],
    UserRole.USER: [
        Permission.CREATE_PET, Permission.READ_PET, Permission.UPDATE_PET,
        Permission.CREATE_RESERVATION, Permission.READ_RESERVATION, Permission.UPDATE_RESERVATION,
        Permission.READ_SERVICE, Permission.READ_MEDICAL_HISTORY, Permission.READ_INVOICE, Permission.READ_PAYMENT, Permission.CREATE_PAYMENT
    ]
}
```

### **🔒 Protección de Endpoints**

```python
# Ejemplo de protección de endpoints
@router.get("/users/", response_model=List[UserOut])
async def get_all_users(
    current_user: dict = Depends(require_admin())  # Solo admin
):
    return await get_all_users_controller(db)

@router.get("/pets/", response_model=List[PetOut])
async def get_all_pets(
    current_user: dict = Depends(get_current_user)  # Todos los usuarios autenticados
):
    user_role = UserRole(current_user["role"])
    
    if user_role in [UserRole.ADMIN, UserRole.EMPLOYEE]:
        return await get_all_pets_controller(db)  # Admin/Employee ven todas
    else:
        user_id = current_user["user_id"]
        return await get_pets_by_user_controller(user_id, db)  # User solo sus mascotas
```

### **🎨 Navegación Dinámica**

#### **Admin Panel**
- Dashboard
- Usuarios
- Empleados
- Mascotas (todas)
- Reservas (todas)
- Historial Médico (todos)
- Pagos (todos)
- Facturas (todas)
- Cuenta
- Configuración

#### **Employee Panel**
- Dashboard
- Mascotas (todas)
- Reservas (todas)
- Historial Médico (todos)
- Pagos (todos)
- Facturas (todas)
- Cuenta

#### **User Panel**
- Mascotas (solo las suyas)
- Historial Médico (solo de sus mascotas)
- Facturas (solo las suyas)
- Servicios (solo los contratados)
- Cuenta

### **🔧 Implementación Técnica**

#### **Backend**
- **Enums**: `UserRole` y `Permission` para roles y permisos
- **AuthorizationService**: Clase para verificación de permisos
- **Dependencies**: Funciones para proteger endpoints
- **Filtrado de datos**: Por `user_id` según el rol

#### **Frontend**
- **AuthContext**: Contexto con información de usuario y permisos
- **Helper functions**: `hasPermission()`, `hasRouteAccess()`, `isAdmin()`, etc.
- **Navegación dinámica**: Links que aparecen según el rol
- **Filtrado automático**: Datos filtrados por usuario

## 🎯 **IMPLEMENTACIÓN DE SERVICIOS CON FILTRADO POR USUARIO**

### **📋 Descripción**
Sistema completo de servicios que permite a los usuarios ver solo los servicios que han contratado a través de reservas, mientras que administradores y empleados ven todos los servicios disponibles.

### **🔧 Arquitectura Backend**

#### **Modelo de Datos**
```python
# Relación entre usuarios, reservas y servicios
User (1) ←→ (N) Reservation (N) ←→ (1) Service
```

#### **Controlador de Servicios**
```python
@cache_response("services:by_user", ttl=600)
async def get_services_by_user_controller(user_id: int, db: AsyncSession):
    """
    Obtiene todos los servicios que un usuario ha contratado a través de sus reservas
    """
    # Obtener servicios únicos que el usuario ha contratado
    result = await db.execute(
        select(Service)
        .join(Reservation, Service.service_id == Reservation.service_id)
        .where(Reservation.user_id == user_id)
        .distinct()
    )
    services = result.scalars().all()
    return services
```

#### **Rutas con Filtrado por Rol**
```python
@router.get("/", response_model=List[ServiceOut])
async def get_all_services(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    user_role = UserRole(current_user["role"])
    
    if user_role in [UserRole.ADMIN, UserRole.EMPLOYEE]:
        return await get_all_services_controller(db)  # Todos los servicios
    else:
        user_id = current_user["user_id"]
        return await get_services_by_user_controller(user_id, db)  # Solo contratados
```

### **🎨 Frontend - Página de Servicios**

#### **Características**
- **Diseño moderno** con cards y hover effects
- **Iconos específicos** para cada tipo de servicio
- **Estados de carga** con spinner animado
- **Manejo de errores** con alertas visuales
- **Responsive design** con grid adaptativo
- **Formateo profesional** de precios y fechas

#### **Tipos de Servicios**
- **Guardería** 🏠 (icono: cama)
- **Transporte** 🚗 (icono: carro)
- **Comida** 🍽️ (icono: utensilios)
- **Otros** 📋 (icono: clipboard)

#### **Información Mostrada**
- Tipo de servicio con icono
- Precio formateado en euros
- Duración del servicio
- Servicios adicionales
- Notas del servicio
- Indicador de alojamiento incluido
- Fecha de creación

#### **Estados de la Página**
```javascript
// Estados manejados
const [services, setServices] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

// Estados de UI
- Loading: Spinner con mensaje
- Error: Alerta roja con mensaje
- Empty: Mensaje contextual según rol
- Success: Grid de servicios
```

### **🔐 Autenticación y Autorización**

#### **Interceptor de Axios**
```javascript
// Configuración automática de token
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/services",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);
```

#### **Verificación de Permisos**
```javascript
// En el componente
const { user, isAdmin, isEmployee, isUser } = useAuth();

// Renderizado condicional
{isAdmin() || isEmployee() ? 'Servicios Disponibles' : 'Mis Servicios Contratados'}
```

### **📊 Datos de Ejemplo**

#### **Servicio Contratado**
```json
{
  "service_id": 1,
  "service_type": "Otros",
  "other_service": "Prueba3",
  "notes": null,
  "base_price": 50.0,
  "duration": "01:30:00",
  "lodging": true,
  "created_at": "2025-07-19T20:21:49.848058"
}
```

#### **Reserva Asociada**
```json
{
  "reservation_id": 11,
  "user_id": 44,
  "service_id": 1,
  "status": "PENDING",
  "checkin_date": "2025-08-02",
  "checkout_date": "2025-08-04"
}
```

### **🧪 Testing y Debugging**

#### **Scripts de Prueba**
- **Debug completo**: Verificación de base de datos, controlador y API
- **Serialización**: Prueba de conversión de modelos SQLAlchemy a Pydantic
- **Autenticación**: Verificación de tokens y permisos

#### **Logs de Debug**
```python
logger.info(f"Endpoint /services/ llamado por usuario: {current_user['email']} con rol: {current_user['role']}")
logger.info(f"Usuario regular - buscando servicios para user_id: {user_id}")
logger.info(f"Servicios encontrados para usuario {user_id}: {len(services)}")
```

### **🔧 Correcciones Implementadas**

#### **Schema Pydantic v2**
```python
# Antes (Pydantic v1)
class Config:
    model_config = {"from_attributes": True}

# Después (Pydantic v2)
model_config = ConfigDict(from_attributes=True)
```

#### **Importaciones de Controladores**
```python
# Antes
from backend.controllers import medical_history_controller

# Después
from backend.controllers.medical_history_controller import (
    create_medical_history,
    get_all_medical_histories,
    get_medical_histories_by_user,
    # ...
)
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

3. **👤 Usuario Regular** (`usuario3@example.com` / `password123`)
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
