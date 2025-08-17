# User Lookup Application

A full-stack web application with Node.js/Express.js backend, MySQL database, and React frontend that allows users to search for user records by name.

## Project Structure

```
user-lookup-app/
├── backend/           # Express.js API server
│   ├── server.js      # Main server file
│   ├── package.json   # Backend dependencies
│   ├── .env          # Environment variables
│   └── database_setup.sql # SQL script to set up database
├── frontend/          # React application
│   ├── src/
│   │   ├── App.js     # Main React component
│   │   └── App.css    # Styling
│   └── package.json   # Frontend dependencies
└── README.md
```

## Features

- **Backend**: RESTful API with Express.js
- **Database**: MySQL with sample user data
- **Frontend**: React-based user interface
- **Search**: Find users by exact name match
- **Error Handling**: Graceful error messages for various scenarios

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher)
2. **MySQL** server running
3. **npm** package manager

## Setup Instructions

### 1. Database Setup

First, set up the MySQL database:

```bash
# Log into MySQL as root
mysql -u root -p

# Run the database setup script
source backend/database_setup.sql
```

Or manually create the database and table:

```sql
CREATE DATABASE user_lookup_db;
USE user_lookup_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    age INT,
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, age, city) VALUES 
('John Doe', 'john.doe@email.com', 30, 'New York'),
('Jane Smith', 'jane.smith@email.com', 25, 'Los Angeles'),
('Mike Johnson', 'mike.johnson@email.com', 35, 'Chicago'),
('Sarah Wilson', 'sarah.wilson@email.com', 28, 'San Francisco'),
('David Brown', 'david.brown@email.com', 32, 'Boston');
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file and update your MySQL credentials:
# DB_HOST=localhost
# DB_USER=your_mysql_username
# DB_PASSWORD=your_mysql_password
# DB_NAME=user_lookup_db
# PORT=5000

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/users` - Get all users (for testing)
- `GET /api/users/:name` - Get user by exact name match

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Enter a user name in the search box (try: John Doe, Jane Smith, etc.)
3. Click "Search" to find the user
4. The user's details will be displayed if found
5. Use "Reset" to clear the search and try again

## Sample Users

The application comes with these sample users:
- John Doe
- Jane Smith
- Mike Johnson
- Sarah Wilson
- David Brown

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check your database credentials in `.env`
   - Verify the database `user_lookup_db` exists

2. **CORS Error**
   - Make sure the backend is running on port 5000
   - Check that CORS is properly configured in the backend

3. **Port Already in Use**
   - Backend: Change the PORT in `.env`
   - Frontend: The React dev server will prompt to use a different port

### Environment Variables

Make sure to update the `.env` file in the backend directory with your actual MySQL credentials:

```env
DB_HOST=localhost
DB_USER=your_actual_username
DB_PASSWORD=your_actual_password
DB_NAME=user_lookup_db
PORT=5000
```

## Development Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Technologies Used

### Backend
- Node.js
- Express.js
- MySQL2
- CORS
- dotenv

### Frontend
- React
- Axios
- CSS3

## License

MIT License
