# 🚀 Despliegue en Render

## 📋 Pasos para desplegar en Render

### 1. Preparar el repositorio
- Asegúrate de que todos los cambios estén committeados
- Push al repositorio de GitHub

### 2. Crear cuenta en Render
- Ve a [render.com](https://render.com)
- Crea una cuenta gratuita
- Conecta tu repositorio de GitHub

### 3. Desplegar la Base de Datos
1. **Nueva Base de Datos PostgreSQL**
   - Tipo: PostgreSQL
   - Plan: Free
   - Nombre: `petland-db`
   - Usuario: `petland_user`

### 4. Desplegar el Backend
1. **Nuevo Web Service**
   - Nombre: `petland-backend`
   - Repositorio: Tu repo de GitHub
   - Rama: `main`
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`

2. **Variables de Entorno:**
   ```
   DATABASE_URL=postgresql://petland_user:password@host:port/petland
   SECRET_KEY=tu_clave_secreta
   ACCESS_TOKEN_EXPIRE_MINUTES=60
   ```

### 5. Desplegar el Frontend
1. **Nuevo Static Site**
   - Nombre: `petland-frontend`
   - Repositorio: Tu repo de GitHub
   - Rama: `main`
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`

2. **Variables de Entorno:**
   ```
   VITE_API_URL=https://petland-backend.onrender.com
   ```

## 🔗 URLs finales
- **Frontend:** https://petland-frontend.onrender.com
- **Backend:** https://petland-backend.onrender.com
- **Base de datos:** PostgreSQL en Render

## ⚠️ Notas importantes
- El plan gratuito tiene limitaciones
- La aplicación puede tardar en "despertar" después de inactividad
- Las migraciones se ejecutan automáticamente al desplegar 