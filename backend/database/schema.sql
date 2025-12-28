CREATE DATABASE hospital_db;
USE hospital_db;

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  department_id INT NOT NULL,
  specialization VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  shift_start TIME NOT NULL,
  shift_end TIME NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  gender ENUM('male','female','other') NOT NULL,
  date_of_birth DATE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  email VARCHAR(255)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,

  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,

  appointment_date DATE NOT NULL,

  window_start TIME NOT NULL,
  window_end TIME NOT NULL,

  status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE medical_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  appointment_id INT NOT NULL,
  diagnosis TEXT,
  prescription TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);

CREATE TABLE bills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('unpaid','paid') DEFAULT 'unpaid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

CREATE TABLE doctor_availability (
  id INT AUTO_INCREMENT PRIMARY KEY,

  doctor_id INT NOT NULL,

  day_of_week TINYINT NOT NULL
    COMMENT '0=Sunday, 1=Monday, ..., 6=Saturday',

  start_time TIME NOT NULL,
  end_time TIME NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT chk_time_range
    CHECK (start_time < end_time),

  CONSTRAINT fk_availability_doctor
    FOREIGN KEY (doctor_id)
    REFERENCES doctors(id)
    ON DELETE CASCADE
);

INSERT INTO roles (name) VALUES
('admin'),
('doctor'),
('nurse'),
('receptionist');