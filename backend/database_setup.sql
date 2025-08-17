-- Create database
CREATE DATABASE IF NOT EXISTS user_lookup_db;

-- Use the database
USE user_lookup_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    age INT,
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email, age, city) VALUES 
('John Doe', 'john.doe@email.com', 30, 'New York'),
('Jane Smith', 'jane.smith@email.com', 25, 'Los Angeles'),
('Mike Johnson', 'mike.johnson@email.com', 35, 'Chicago'),
('Sarah Wilson', 'sarah.wilson@email.com', 28, 'San Francisco'),
('David Brown', 'david.brown@email.com', 32, 'Boston');
