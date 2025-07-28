#!/bin/bash

# Build script for Render deployment

echo "🚀 Starting build process..."

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Run database migrations
echo "🗄️ Running database migrations..."
alembic upgrade head

# Build frontend (if needed)
echo "🎨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "✅ Build completed successfully!" 