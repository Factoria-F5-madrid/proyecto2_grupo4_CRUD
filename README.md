# 🏠 PetLand F5 - Sistema de Gestión de Mascotas

## 📋 Descripción General

**PetLand F5** es una aplicación web completa para la gestión de servicios veterinarios y cuidado de mascotas. El sistema implementa una arquitectura moderna con separación clara entre frontend y backend, incluyendo un sistema avanzado de roles y permisos (RBAC) que garantiza la seguridad y escalabilidad de la aplicación.

## 🏗️ Arquitectura del Proyecto

### **Arquitectura General**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Base de       │
│   (React)       │◄──►│   (FastAPI)     │◄──►│   Datos         │
│                 │    │                 │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Tailwind CSS  │    │   Redis Cache   │    │   Alembic       │
│   (UI/UX)       │    │   (Performance) │    │   (Migrations)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Patrón de Diseño**
- **Frontend**: Arquitectura basada en componentes con React
- **Backend**: Arquitectura RESTful con FastAPI
- **Base de Datos**: PostgreSQL con ORM SQLAlchemy
- **Caché**: Redis para optimización de rendimiento
- **Autenticación**: JWT con sistema de roles granular

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **React 18**: Biblioteca de JavaScript para interfaces de usuario
- **React Router**: Enrutamiento del lado del cliente
- **Tailwind CSS**: Framework CSS utility-first
- **Axios**: Cliente HTTP para peticiones a la API
- **React Icons**: Biblioteca de iconos
- **Context API**: Gestión de estado global

### **Backend**
- **FastAPI**: Framework web moderno y rápido para Python
- **SQLAlchemy**: ORM para Python
- **PostgreSQL**: Sistema de gestión de base de datos
- **Redis**: Almacenamiento en caché
- **Alembic**: Herramienta de migración de base de datos
- **Pydantic**: Validación de datos y serialización

### **Herramientas de Desarrollo**
- **Git**: Control de versiones
- **Docker**: Containerización (opcional)
- **Render**: Plataforma de despliegue
- **Vite**: Herramienta de construcción para el frontend

## 📁 Estructura del Proyecto

```
proyecto2_grupo4_CRUD/
├── 📂 backend/                    # Backend en FastAPI
│   ├── 📂 controllers/           # Lógica de negocio
│   ├── 📂 models/               # Modelos de base de datos
│   ├── 📂 routes/               # Endpoints de la API
│   ├── 📂 schema/               # Esquemas Pydantic
│   ├── 📂 services/             # Servicios de negocio
│   ├── 📂 utils/                # Utilidades (auth, cache, etc.)
│   ├── 📂 websockets/           # Sistema de WebSockets
│   ├── 📂 tests/                # Tests automatizados
│   ├── 📂 docs/                 # Documentación técnica
│   ├── 📂 data/                 # Archivos de datos
│   ├── 📂 logs/                 # Archivos de logs
│   ├── 📄 main.py               # Punto de entrada
│   ├── 📄 pytest.ini           # Configuración de tests
│   └── 📄 alembic.ini          # Configuración de migraciones
├── 📂 frontend/                  # Frontend en React
│   ├── 📂 src/
│   │   ├── 📂 components/       # Componentes reutilizables
│   │   ├── 📂 pages/           # Páginas de la aplicación
│   │   ├── 📂 services/        # Servicios de API
│   │   ├── 📂 context/         # Contextos de React
│   │   ├── 📂 routes/          # Configuración de rutas
│   │   ├── 📂 layout/          # Layout principal
│   │   ├── 📂 config/          # Configuración de la app
│   │   └── 📂 assets/          # Recursos estáticos
│   ├── 📄 package.json         # Dependencias de Node.js
│   ├── 📄 vite.config.js       # Configuración de Vite
│   └── 📄 index.html           # HTML principal
├── 📂 scripts/                   # Scripts de utilidad
├── 📂 alembic/                   # Migraciones de base de datos
├── 📄 requirements.txt           # Dependencias de Python
├── 📄 package-lock.json         # Lock file de Node.js
├── 📄 build.sh                  # Script de construcción
├── 📄 render.yaml               # Configuración de despliegue
└── 📄 README.md                  # Documentación del proyecto
```

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- **Python 3.8+** para el backend
- **PostgreSQL 12+** para la base de datos
- **Redis 6+** para caché (opcional)

### **Configuración del Entorno**

#### **1. Clonar el Repositorio**
```bash
git clone <repository-url>
cd proyecto2_grupo4_CRUD
```

#### **2. Configurar Entorno Virtual (Recomendado)**
```bash
# Crear entorno virtual para Python
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate
```

#### **3. Instalar Dependencias Backend**
```bash
pip install -r requirements.txt
```

#### **4. Configurar Base de Datos**
```bash
# Crear base de datos
createdb petland_db

# Configurar variables de entorno
export DATABASE_URL="postgresql://user:password@localhost/petland_db"
```

#### **5. Ejecutar Migraciones**
```bash
alembic upgrade head
```

---

## 🎨 **FRONTEND - React & JavaScript**

### **Tecnologías Frontend**

#### **React 18**
- **Componentes funcionales** con hooks modernos
- **Context API** para gestión de estado global
- **React Router** para navegación del lado del cliente
- **Hooks personalizados** para lógica reutilizable

#### **JavaScript ES6+**
- **Arrow functions** y destructuring
- **Async/await** para operaciones asíncronas
- **Template literals** para interpolación de strings
- **Spread operator** para manipulación de objetos

#### **Tailwind CSS**
- **Utility-first CSS** para desarrollo rápido
- **Responsive design** con breakpoints
- **Componentes personalizados** con clases utilitarias
- **Animaciones y transiciones** integradas

### **Instalación del Frontend**

#### **1. Navegar al Directorio Frontend**
```bash
cd frontend
```

#### **2. Instalar Dependencias**
```bash
npm install
```

#### **3. Configurar Variables de Entorno**
Crear archivo `.env` en el directorio `frontend/`:
```bash
VITE_API_URL=http://localhost:8000
VITE_CLOUDINARY_URL=cloudinary://your-cloudinary-url
```

#### **4. Iniciar Servidor de Desarrollo**
```bash
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

### **Estructura del Frontend**

```
frontend/src/
├── 📂 components/           # Componentes reutilizables
│   ├── 📂 Button/          # Componentes de botones
│   ├── 📂 Cards/           # Componentes de tarjetas
│   ├── 📂 Forms/           # Formularios reutilizables
│   ├── 📂 Nav/             # Navegación y modales
│   └── 📂 Footer/          # Pie de página
├── 📂 pages/               # Páginas principales
│   ├── 📄 Home.jsx         # Dashboard principal
│   ├── 📄 Login.jsx        # Página de autenticación
│   ├── 📄 Services.jsx     # Catálogo de servicios
│   ├── 📄 Pets.jsx         # Gestión de mascotas
│   ├── 📄 Account.jsx      # Perfil de usuario
│   └── 📄 ContactUs.jsx    # Página de contacto
├── 📂 services/            # Servicios de API
│   ├── 📄 userServices.js      # Servicios de usuarios
│   ├── 📄 petServices.js       # Servicios de mascotas
│   ├── 📄 reservationServices.js # Servicios de reservas
│   └── 📄 serviceServices.js   # Servicios de servicios
├── 📂 context/             # Contextos de React
│   └── 📄 AuthContext.jsx      # Contexto de autenticación
├── 📂 routes/              # Configuración de rutas
│   └── 📄 Routes.jsx           # Definición de rutas
├── 📂 layout/              # Layout principal
│   └── 📄 Layout.jsx           # Layout con navegación
├── 📂 config/              # Configuración
│   ├── 📄 api.js               # Configuración de API
│   └── 📄 axios.js             # Configuración de Axios
└── 📂 assets/              # Recursos estáticos
    ├── 📄 PetHome.svg          # Logo principal
    ├── 📄 PetLandHome.png      # Imágenes de marca
    └── 📄 PetSpinner.json      # Animación de carga
```

### **Conexión con el Backend**

#### **Configuración de API**
```javascript
// frontend/src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://petland-backend-qnss.onrender.com";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    ME: `${API_BASE_URL}/auth/me`,
  },
  // ... más endpoints
};
```

#### **Configuración de Axios**
```javascript
// frontend/src/config/axios.js
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
});

// Interceptor para tokens JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### **Funcionalidades Destacables del Frontend**

#### **1. Sistema de Autenticación**
- **Login/Registro** con validación en tiempo real
- **Gestión de tokens JWT** automática
- **Protección de rutas** basada en roles
- **Persistencia de sesión** con localStorage

```javascript
// Ejemplo de login
const login = async (email, password) => {
  const response = await loginUser({ email, password });
  localStorage.setItem('token', response.access_token);
  localStorage.setItem('user', JSON.stringify(response));
  setUser(response);
};
```

#### **2. Navegación Adaptativa**
- **Menú dinámico** según rol del usuario
- **Rutas protegidas** automáticamente
- **Redirección inteligente** post-login

```javascript
// Navegación según rol
const getNavigationItems = () => {
  if (isAdmin()) {
    return [
      { label: "Dashboard", to: "/", icon: <FaHome /> },
      { label: "Empleados", to: "/employees", icon: <FaUsers /> },
      // ... más items para admin
    ];
  } else if (isEmployee()) {
    return [
      { label: "Panel", to: "/", icon: <FaHome /> },
      { label: "Mascotas", to: "/pets", icon: <FaDog /> },
      // ... más items para empleados
    ];
  }
  // ... items para usuarios
};
```

#### **3. Dashboard Personalizado**
- **Tarjetas adaptativas** según rol
- **Estadísticas en tiempo real**
- **Accesos directos** a funcionalidades principales

```javascript
// Dashboard adaptativo
const getDashboardCards = () => {
  const cards = [
    {
      title: isAdmin() ? "Reservas" : "Servicios",
      value: isAdmin() ? stats.totalReservations : stats.totalServices,
      icon: isAdmin() ? <FaCalendarAlt /> : <FaClipboard />,
      route: isAdmin() ? "/reservations" : "/services",
    },
    // ... más tarjetas
  ];
  return cards.filter(card => card.show);
};
```

#### **4. Gestión de Servicios**
- **Catálogo visual** de servicios
- **CRUD completo** para administradores
- **Reservas integradas** desde el catálogo
- **Subida de imágenes** con Cloudinary

```javascript
// Creación de reserva desde servicio
const handleReservation = async (service) => {
  if (!user) {
    setShowLoginPrompt(true);
    return;
  }
  
  setSelectedServiceForReservation(service);
  setShowModal(true);
};
```

#### **5. Formularios Inteligentes**
- **Validación en tiempo real**
- **Manejo de errores** centralizado
- **Estados de carga** con feedback visual
- **Auto-completado** de datos del usuario

```javascript
// Formulario de reserva con validación
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.service_type) {
    throw new Error('Por favor, selecciona un tipo de servicio');
  }
  if (!formData.date || !formData.time) {
    throw new Error('Por favor, selecciona fecha y hora');
  }
  
  // ... lógica de envío
};
```

#### **6. Interfaz Responsive**
- **Diseño mobile-first** con Tailwind CSS
- **Componentes adaptativos** según pantalla
- **Navegación táctil** optimizada
- **Accesibilidad** mejorada

```javascript
// Componente responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {services.map(service => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* Contenido del servicio */}
    </div>
  ))}
</div>
```

#### **7. Gestión de Estado Global**
- **Context API** para autenticación
- **Estado persistente** entre sesiones
- **Sincronización** automática de datos
- **Cache inteligente** de respuestas

```javascript
// Contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const login = async (email, password) => {
    // ... lógica de login
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### **Scripts de Desarrollo**

#### **Comandos Disponibles**
```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de producción
npm run preview

# Linting
npm run lint
```

#### **Configuración de Vite**
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
```

### **Optimizaciones de Rendimiento**

#### **Lazy Loading**
```javascript
// Carga diferida de componentes
const ModalReservation = lazy(() => import('../components/Nav/ModalReservation'));
const FormEditService = lazy(() => import('../components/Forms/FormEditService'));
```

#### **Memoización**
```javascript
// Optimización con React.memo
const PetCard = React.memo(({ pet, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Contenido del componente */}
    </div>
  );
});
```

### **Manejo de Errores**

#### **Interceptores de Axios**
```javascript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

#### **Boundary de Errores**
```javascript
// Manejo centralizado de errores
const handleError = (error) => {
  if (error.response?.status === 401) {
    return 'Sesión expirada. Por favor, inicia sesión nuevamente.';
  }
  return error.message || 'Error de conexión. Verifica tu internet.';
};
```

---

## 🚀 Despliegue

### **Configuración de Render**

#### **Frontend (render.yaml)**
```yaml
services:
  - type: web
    name: petland-frontend
    env: static
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: frontend/dist
    envVars:
      - key: VITE_API_URL
        value: https://petland-backend-qnss.onrender.com
```

### **Variables de Entorno de Producción**
```bash
# Frontend
VITE_API_URL=https://petland-backend-qnss.onrender.com
VITE_CLOUDINARY_URL=cloudinary://production-url
```

---

## 🧪 Testing

### **Tests Frontend**
```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:coverage
```

---

## 📈 Rendimiento

### **Métricas Optimizadas**
- **Time to First Byte (TTFB)**: < 200ms
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

### **Optimizaciones Implementadas**
- **Code splitting** con React.lazy()
- **Memoización** de componentes pesados
- **Optimización de imágenes** con formatos modernos
- **Caché de API** con interceptores de Axios

---

## 🤝 Contribución

### **Guías de Contribución**
1. **Fork** el repositorio
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### **Estándares de Código**
- **Frontend**: ESLint + Prettier
- **Commits**: Conventional Commits
- **Documentación**: JSDoc

---

**PetLand F5** - Sistema de Gestión de Mascotas con arquitectura moderna y escalable 🏠🐾

*Desarrollado con React, FastAPI y las mejores prácticas de desarrollo web moderno.*
