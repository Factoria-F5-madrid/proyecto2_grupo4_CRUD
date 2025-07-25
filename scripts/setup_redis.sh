#!/bin/bash

# Script para configurar Redis en diferentes sistemas operativos

echo "🚀 Configurando Redis para el proyecto..."

# Detectar sistema operativo
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "📦 Detectado: Linux"
    
    # Verificar si Redis está instalado
    if ! command -v redis-server &> /dev/null; then
        echo "📥 Instalando Redis..."
        sudo apt-get update
        sudo apt-get install -y redis-server
    else
        echo "✅ Redis ya está instalado"
    fi
    
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "🍎 Detectado: macOS"
    
    # Verificar si Homebrew está instalado
    if ! command -v brew &> /dev/null; then
        echo "❌ Homebrew no está instalado. Instálalo desde https://brew.sh/"
        exit 1
    fi
    
    # Verificar si Redis está instalado
    if ! command -v redis-server &> /dev/null; then
        echo "📥 Instalando Redis..."
        brew install redis
    else
        echo "✅ Redis ya está instalado"
    fi
    
else
    echo "❌ Sistema operativo no soportado: $OSTYPE"
    echo "📋 Instala Redis manualmente desde https://redis.io/download"
    exit 1
fi

# Verificar que Redis esté funcionando
echo "🔍 Verificando que Redis esté funcionando..."

# Intentar iniciar Redis si no está corriendo
if ! redis-cli ping &> /dev/null; then
    echo "🚀 Iniciando Redis..."
    redis-server --daemonize yes
    sleep 2
fi

# Verificar conexión
if redis-cli ping &> /dev/null; then
    echo "✅ Redis está funcionando correctamente"
    echo "📊 Información de Redis:"
    redis-cli info server | grep -E "(redis_version|uptime_in_seconds|connected_clients)"
else
    echo "❌ Error: No se pudo conectar a Redis"
    echo "🔧 Solución:"
    echo "1. Verifica que Redis esté instalado: redis-server --version"
    echo "2. Inicia Redis manualmente: redis-server"
    echo "3. En otra terminal, verifica: redis-cli ping"
    exit 1
fi

# Configurar variables de entorno
echo "🔧 Configurando variables de entorno..."

# Crear archivo .env si no existe
if [ ! -f ".env" ]; then
    echo "📝 Creando archivo .env..."
    cat > .env << EOF
# Database
DATABASE_URL=postgresql+asyncpg://user:password@localhost/dbname

# Redis
REDIS_URL=redis://localhost:6379
REDIS_TTL=300

# Logging
LOG_LEVEL=DEBUG
EOF
    echo "✅ Archivo .env creado"
else
    echo "✅ Archivo .env ya existe"
fi

# Instalar dependencias de Python
echo "📦 Instalando dependencias de Python..."
pip install -r requirements.txt

echo "🎉 ¡Configuración completada!"
echo ""
echo "📋 Para usar el caché:"
echo "1. Asegúrate de que Redis esté corriendo: redis-server"
echo "2. Ejecuta tu aplicación: uvicorn backend.main:app --reload"
echo "3. El caché se activará automáticamente"
echo ""
echo "🔍 Para verificar que funciona:"
echo "1. Haz una petición GET a /users"
echo "2. Revisa los logs para ver 'Cache miss' y 'Cache hit'"
echo "3. Haz la misma petición de nuevo para ver 'Cache hit'"
echo ""
echo "📚 Documentación: backend/docs/cache_implementation.md" 