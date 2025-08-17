#!/bin/bash

echo "🧪 Testing User Lookup Application Setup..."

# Test if backend files exist
echo "📁 Checking backend files..."
if [ -f "backend/server.js" ] && [ -f "backend/package.json" ] && [ -f "backend/database_setup.sql" ]; then
    echo "✅ Backend files exist"
else
    echo "❌ Backend files missing"
    exit 1
fi

# Test if frontend files exist
echo "📁 Checking frontend files..."
if [ -f "frontend/src/App.js" ] && [ -f "frontend/src/App.css" ] && [ -f "frontend/package.json" ]; then
    echo "✅ Frontend files exist"
else
    echo "❌ Frontend files missing"
    exit 1
fi

# Check if dependencies are installed
echo "📦 Checking dependencies..."
if [ -d "backend/node_modules" ] && [ -d "frontend/node_modules" ]; then
    echo "✅ Dependencies are installed"
else
    echo "⚠️  Dependencies not yet installed. Run ./setup.sh first."
fi

echo ""
echo "🎉 Project structure is correct!"
echo ""
echo "Next steps to run the application:"
echo "1. Make sure MySQL is running"
echo "2. Set up the database: mysql -u root -p < backend/database_setup.sql"
echo "3. Update backend/.env with your MySQL credentials"
echo "4. Start backend: cd backend && npm run dev"
echo "5. Start frontend: cd frontend && npm start"
echo "6. Open http://localhost:3000"

