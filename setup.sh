#!/bin/bash

echo "🚀 Setting up User Lookup Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL first."
    exit 1
fi

echo "✅ Node.js and MySQL found"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Dependencies installed successfully!"

echo ""
echo "🏁 Setup completed! Next steps:"
echo ""
echo "1. Set up your MySQL database:"
echo "   mysql -u root -p < backend/database_setup.sql"
echo ""
echo "2. Update backend/.env with your MySQL credentials"
echo ""
echo "3. Start the backend server:"
echo "   cd backend && npm run dev"
echo ""
echo "4. In a new terminal, start the frontend:"
echo "   cd frontend && npm start"
echo ""
echo "5. Open http://localhost:3000 in your browser"
echo ""
