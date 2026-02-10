-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2026 at 10:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `appointment_date` date NOT NULL,
  `window_start` time NOT NULL,
  `window_end` time NOT NULL,
  `status` enum('scheduled','completed','cancelled') DEFAULT 'scheduled',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `patient_id`, `doctor_id`, `appointment_date`, `window_start`, `window_end`, `status`, `created_at`) VALUES
(1, 1, 1, '2025-12-30', '08:00:00', '15:00:00', 'completed', '2025-12-27 17:00:21'),
(2, 1, 1, '2025-12-30', '08:00:00', '15:00:00', 'scheduled', '2025-12-27 17:00:28'),
(3, 1, 1, '2025-12-30', '08:00:00', '15:00:00', 'completed', '2025-12-27 17:03:04'),
(4, 1, 1, '2025-12-28', '08:00:00', '15:00:00', 'completed', '2025-12-27 17:04:05'),
(5, 1, 1, '2025-12-28', '08:00:00', '15:00:00', 'completed', '2025-12-27 17:04:32'),
(6, 1, 2, '2025-12-30', '08:00:00', '15:00:00', 'completed', '2025-12-27 20:41:51'),
(7, 1, 2, '2025-12-30', '08:00:00', '15:00:00', 'scheduled', '2025-12-27 20:47:04'),
(8, 1, 3, '2025-12-28', '08:00:00', '15:00:00', 'completed', '2025-12-27 21:00:41'),
(9, 1, 1, '2025-12-27', '08:00:00', '15:00:00', 'cancelled', '2025-12-27 22:22:06'),
(10, 8, 1, '2025-12-29', '08:00:00', '15:00:00', 'completed', '2025-12-29 10:51:33'),
(11, 11, 1, '2025-12-29', '08:00:00', '15:00:00', 'completed', '2025-12-29 11:38:34'),
(12, 4, 1, '2025-12-29', '08:00:00', '15:00:00', 'completed', '2025-12-29 22:45:37'),
(13, 6, 1, '2025-12-30', '08:00:00', '15:00:00', 'scheduled', '2025-12-30 09:36:48'),
(14, 1, 1, '2025-12-31', '08:00:00', '15:00:00', 'cancelled', '2025-12-30 23:11:45'),
(15, 1, 1, '2025-12-31', '08:00:00', '15:00:00', 'cancelled', '2025-12-31 13:31:48'),
(16, 1, 1, '2025-12-31', '08:00:00', '15:00:00', 'cancelled', '2025-12-31 13:34:26'),
(17, 1, 1, '2025-12-31', '08:00:00', '15:00:00', 'scheduled', '2025-12-31 13:36:59'),
(18, 1, 1, '2025-12-31', '08:00:00', '15:00:00', 'cancelled', '2025-12-31 13:38:30'),
(19, 1, 1, '2025-12-31', '08:00:00', '15:00:00', 'cancelled', '2025-12-31 13:39:35'),
(20, 1, 1, '2025-12-31', '08:00:00', '15:00:00', 'scheduled', '2025-12-31 13:42:46'),
(21, 2, 1, '2025-12-31', '08:00:00', '15:00:00', 'cancelled', '2025-12-31 13:45:18'),
(22, 1, 1, '2026-01-02', '08:00:00', '15:00:00', 'completed', '2026-01-02 21:47:00'),
(23, 8, 1, '2026-01-02', '08:00:00', '15:00:00', 'completed', '2026-01-02 22:08:23'),
(24, 5, 1, '2026-01-02', '08:00:00', '15:00:00', 'completed', '2026-01-02 22:31:40'),
(25, 1, 1, '2026-01-06', '08:00:00', '15:00:00', 'completed', '2026-01-06 12:19:43'),
(26, 1, 3, '2026-01-25', '08:00:00', '15:00:00', 'scheduled', '2026-01-25 10:38:09'),
(27, 1, 4, '2026-01-25', '08:00:00', '15:00:00', 'scheduled', '2026-01-25 16:11:00'),
(28, 1, 1, '2026-02-04', '08:00:00', '15:00:00', 'cancelled', '2026-02-04 22:54:11'),
(29, 1, 1, '2026-02-06', '08:00:00', '15:00:00', 'scheduled', '2026-02-04 22:55:14'),
(30, 1, 1, '2026-02-05', '08:00:00', '15:00:00', 'completed', '2026-02-04 23:07:07'),
(31, 2, 3, '2026-02-07', '08:00:00', '15:00:00', 'completed', '2026-02-07 19:59:38'),
(32, 2, 1, '2026-02-07', '08:00:00', '15:00:00', 'scheduled', '2026-02-07 20:53:27'),
(33, 2, 1, '2026-02-09', '08:00:00', '15:00:00', 'scheduled', '2026-02-07 20:54:28'),
(34, 3, 1, '2026-02-08', '08:00:00', '15:00:00', 'scheduled', '2026-02-08 08:57:53'),
(35, 4, 1, '2026-02-08', '08:00:00', '15:00:00', 'scheduled', '2026-02-08 09:00:21');

-- --------------------------------------------------------

--
-- Table structure for table `appointments_old`
--

CREATE TABLE `appointments_old` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `appointment_date` datetime NOT NULL,
  `status` enum('pending','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointments_old2`
--

CREATE TABLE `appointments_old2` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `requested_datetime` datetime NOT NULL,
  `scheduled_start` datetime NOT NULL,
  `scheduled_end` datetime NOT NULL,
  `status` enum('pending','scheduled','cancelled') DEFAULT 'scheduled',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('unpaid','paid') DEFAULT 'unpaid',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `description`) VALUES
(1, 'Cardiology', 'Heart-related treatments'),
(2, 'Neurology', 'Brain and nervous system'),
(3, 'Pediatrics', 'Children healthcare'),
(4, 'Orthopedics', 'Bones and joints'),
(5, 'General Medicine', 'General diagnosis');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `shift_start` time NOT NULL,
  `shift_end` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `user_id`, `department_id`, `specialization`, `created_at`, `shift_start`, `shift_end`) VALUES
(1, 2, 1, 'Cardiology Specialist', '0000-00-00 00:00:00', '08:00:00', '15:00:00'),
(2, 3, 5, 'General Medicine Specialist', '0000-00-00 00:00:00', '08:00:00', '15:00:00'),
(3, 4, 2, 'Neurology Specialist', '0000-00-00 00:00:00', '08:00:00', '15:00:00'),
(4, 5, 4, 'Orthopedics Specialist', '0000-00-00 00:00:00', '08:00:00', '15:00:00'),
(5, 6, 3, 'Pediatrics Specialist', '0000-00-00 00:00:00', '08:00:00', '15:00:00'),
(6, 7, 1, 'Cardiology', '2025-12-28 10:59:01', '00:00:00', '00:00:00'),
(7, 13, 2, 'Neurology', '2026-01-15 22:07:09', '00:00:00', '00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `medical_records`
--

CREATE TABLE `medical_records` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `diagnosis` text DEFAULT NULL,
  `prescription` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `full_name`, `gender`, `date_of_birth`, `phone`, `address`, `created_at`, `email`) VALUES
(1, 'kenny odukoya', 'male', '2006-06-02', '07054034139', 'sparklight estate magboro', '2025-12-27 16:43:39', 'kennyodukoya001@gmail.com'),
(2, 'kenny odukoya', 'male', '2009-07-10', '07054034139', 'sparklight estate, magboro', '2025-12-28 17:25:18', 'kennyodukoya001@gmail.com'),
(3, 'kenny odukoya', 'male', '2009-07-10', '07054034139', 'sparklight estate, magboro', '2025-12-28 17:26:16', 'kennyodukoya001@gmail.com'),
(4, 'kenny odukoya', 'male', '2009-07-10', '07054034139', 'sparklight estate, magboro', '2025-12-28 17:27:48', 'kennyodukoya001@gmail.com'),
(5, 'Mr. kenny odukoya', 'other', '2008-10-15', '07054034135', 'sparklight estate magboro', '2025-12-28 22:03:04', 'kennyodukoya2@gmail.com'),
(6, 'Mr. kenny odukoya', 'other', '2008-10-15', '07054034135', 'sparklight estate magboro', '2025-12-28 22:04:31', 'kennyodukoya2@gmail.com'),
(7, 'Mr. kenny odukoya', 'other', '2008-10-15', '07054034135', 'sparklight estate magboro', '2025-12-28 22:06:09', 'kennyodukoya2@gmail.com'),
(8, 'Mr. kenny odukoya', 'other', '2008-10-15', '07054034135', 'sparklight estate magboro', '2025-12-28 22:07:08', 'kennyodukoya2@gmail.com'),
(9, 'Mr. kenny odukoya', 'other', '2025-12-02', '07054034139', 'sparklight estate magboro', '2025-12-28 22:09:15', 'kennyodukoya2@gmail.com'),
(10, 'kenny odukoya', 'male', '2025-12-04', '07054034139', 'sparklight estate magboro', '2025-12-28 22:10:35', 'kennyodukoya001@gmail.com'),
(11, 'kenny odukoya', 'male', '2025-12-15', '07054034139', 'sparklight estate magboro', '2025-12-28 22:16:50', 'kennyodukoya2@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `patient_records`
--

CREATE TABLE `patient_records` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `diagnosis` text NOT NULL,
  `symptoms` text DEFAULT NULL,
  `treatment` text DEFAULT NULL,
  `prescription` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_records`
--

INSERT INTO `patient_records` (`id`, `patient_id`, `doctor_id`, `appointment_id`, `diagnosis`, `symptoms`, `treatment`, `prescription`, `notes`, `created_at`) VALUES
(1, 8, 1, 10, 'headache', 'headache', 'paracetamol', 'paracetamol: 2, 3-times daily', 'just headaches', '2025-12-29 23:23:39'),
(2, 11, 1, 11, 'infection in the leg', 'leg pain', 'amputation', 'antibiotics', 'amputation required\nleg to be cut off', '2025-12-29 23:27:55'),
(3, 1, 1, 3, 'pain also', 'pain', 'diclofenac', 'diclofenac twice daily', 'pain', '2025-12-30 23:26:00'),
(4, 8, 1, 23, 'malaria', 'headache', 'tablets prescription', 'amartem softgel: 1, 2 times daily\nparacetamol: 2, 3 times daily', 'malaria', '2026-01-02 23:21:21'),
(5, 1, 1, 22, 'malaria', 'headache', 'tablets prescription and injection', 'amartem.\nparacetamol\nstrepsils', 'given injection', '2026-01-02 23:27:11'),
(6, 5, 1, 24, 'malaria', 'headache', 'injection and tablets prescription', 'amartem\nparacetamol\nstrepsils', 'malaria man, not good for the body', '2026-01-02 23:33:45'),
(7, 5, 1, 24, 'malaria', 'headache', 'injection and tablets prescription', 'amartem\nparacetamol\nstrepsils', 'malaria man, not good for the body', '2026-01-02 23:34:22'),
(8, 5, 1, 24, 'malaria', 'headache', 'injection and tablets prescription', 'amartem\nparacetamol\nstrepsils', 'malaria man, not good for the body', '2026-01-02 23:37:11'),
(9, 1, 1, 25, 'fxygfuhg', 'gv jhk h', 'try9yu', 'g7ygg5f', 'ugyyuujmuy', '2026-01-06 13:21:52'),
(10, 2, 3, 31, 'tumor', 'passing out, forgetting certain moments, black outs', 'surgery', 'anti biotics', 'tumor', '2026-02-07 21:07:23');

-- --------------------------------------------------------

--
-- Table structure for table `receptionists`
--

CREATE TABLE `receptionists` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receptionists`
--

INSERT INTO `receptionists` (`id`, `user_id`, `created_at`) VALUES
(1, 14, '2026-01-24 12:39:18');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'doctor'),
(3, 'nurse'),
(4, 'receptionist');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `full_name`, `email`, `password`, `phone`, `created_at`) VALUES
(1, 1, 'System Admin', 'admin@hospital.com', '$2y$10$YbT5.NUtrj3Gxf90bUzGSeKNPBoRfh9IkU6gRibD/dS6OLkT7OdIa', NULL, '2025-12-25 22:23:17'),
(2, 2, 'Dr. Cardiology', 'cardiology@hospital.com', '$2y$10$DiNXYfHFVNfy.dsxrJDuAOz865AvoX2MSfafxF5vy8nBLQ9OHYTpm', NULL, '2025-12-25 23:27:34'),
(3, 2, 'Dr. General Medicine', 'generalmedicine@hospital.com', '$2y$10$YypT3a9Yz5eg7sUWtkFPaeLWE9Bt.lA1zHMg392zHSbc9W.T3f/KS', NULL, '2025-12-25 23:27:34'),
(4, 2, 'Dr. Neurology', 'neurology@hospital.com', '$2y$10$o3aue9h2chj8tIc5vZrDreQty/7rfUdFmXJ3KNo7SNgL3JAb5dIEC', NULL, '2025-12-25 23:27:34'),
(5, 2, 'Dr. Orthopedics', 'orthopedics@hospital.com', '$2y$10$xAqOcoUPA7jSdgutNUcm9.EjcwlMedXbo3ZrY32oISr3Gua8t6epS', NULL, '2025-12-25 23:27:34'),
(6, 2, 'Dr. Pediatrics', 'pediatrics@hospital.com', '$2y$10$4ijggFa4Dspvchwz4JHIG.ivXXvQXXBlyZtvDjmBq/ZYaKUU7dKBa', NULL, '2025-12-25 23:27:34'),
(7, 2, 'kenny odukoya', 'kehindeodukoyaade@gmail.com', '$2y$10$MUJPNxKqXZfqQIPaBMT/1On9R.J1Q1wlqOkIQUqQWkzcgDgTwDcPe', '07054034139', '2025-12-28 10:59:01'),
(13, 2, 'Dr. Wunmi', 'wumni@hospital.com', '$2y$10$Lepqp79e1LCHcPXZJpSHiuNln4/ukWd.8pNT7c60sfXGxZ2JjaKZW', '07045889845', '2026-01-15 22:07:09'),
(14, 4, 'Lucas hernandez', 'lucas.hernandez@hospital.com', '$2y$10$MhnblRI4nIP4pweOK2SBSeLs.Re6RZ4JULWXkjPPCXNinGUDktYWu', '07054034139', '2026-01-24 12:39:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `appointments_old`
--
ALTER TABLE `appointments_old`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointments_old2`
--
ALTER TABLE `appointments_old2`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_appointment_patient` (`patient_id`),
  ADD KEY `fk_appointment_doctor` (`doctor_id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `medical_records`
--
ALTER TABLE `medical_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient_records`
--
ALTER TABLE `patient_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `receptionists`
--
ALTER TABLE `receptionists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `appointments_old`
--
ALTER TABLE `appointments_old`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointments_old2`
--
ALTER TABLE `appointments_old2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `medical_records`
--
ALTER TABLE `medical_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `patient_records`
--
ALTER TABLE `patient_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `receptionists`
--
ALTER TABLE `receptionists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`);

--
-- Constraints for table `appointments_old`
--
ALTER TABLE `appointments_old`
  ADD CONSTRAINT `appointments_old_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  ADD CONSTRAINT `appointments_old_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`);

--
-- Constraints for table `appointments_old2`
--
ALTER TABLE `appointments_old2`
  ADD CONSTRAINT `fk_appointment_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_appointment_patient` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`);

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `doctors_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`);

--
-- Constraints for table `medical_records`
--
ALTER TABLE `medical_records`
  ADD CONSTRAINT `medical_records_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments_old` (`id`);

--
-- Constraints for table `patient_records`
--
ALTER TABLE `patient_records`
  ADD CONSTRAINT `patient_records_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `patient_records_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `patient_records_ibfk_3` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `receptionists`
--
ALTER TABLE `receptionists`
  ADD CONSTRAINT `receptionists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
