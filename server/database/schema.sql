CREATE DATABASE IF NOT EXISTS parkconnect;
USE parkconnect;

-- Table des utilisateurs
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role ENUM('CLIENT', 'ADMIN') DEFAULT 'CLIENT',
  isVerified BOOLEAN DEFAULT FALSE,
  verifyToken VARCHAR(36) UNIQUE,
  resetToken VARCHAR(36) UNIQUE,
  lastLogin DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des places de parking
CREATE TABLE parking_spots (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  type ENUM('INDOOR', 'OUTDOOR') NOT NULL,
  isAccessible BOOLEAN DEFAULT FALSE,
  isPriority BOOLEAN DEFAULT FALSE,
  hourlyRate DECIMAL(10, 2) NOT NULL,
  dailyRate DECIMAL(10, 2) NOT NULL,
  monthlyRate DECIMAL(10, 2) NOT NULL,
  status ENUM('AVAILABLE', 'OCCUPIED', 'MAINTENANCE') DEFAULT 'AVAILABLE',
  ownerId VARCHAR(36),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ownerId) REFERENCES users(id)
);

-- Table des réservations
CREATE TABLE bookings (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  parkingSpotId VARCHAR(36) NOT NULL,
  startTime DATETIME NOT NULL,
  endTime DATETIME NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') DEFAULT 'PENDING',
  paymentId VARCHAR(255),
  qrCode TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (parkingSpotId) REFERENCES parking_spots(id)
);

-- Table des notifications
CREATE TABLE notifications (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('INFO', 'SUCCESS', 'WARNING', 'ERROR') NOT NULL,
  isRead BOOLEAN DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Index pour améliorer les performances
CREATE INDEX idx_parking_spots_location ON parking_spots(latitude, longitude);
CREATE INDEX idx_bookings_dates ON bookings(startTime, endTime);
CREATE INDEX idx_notifications_user ON notifications(userId, isRead);