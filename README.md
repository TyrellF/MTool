# Monitoring Tool - MTool

## Overview

MTool is a robust monitoring tool designed to track the status of multiple custom solutions, providing live updates and notifications in case of downtime. It includes capabilities for code checking, returning exact error messages, and utilizes AWS CloudWatch for infrastructure-level tracking to ensure comprehensive monitoring and timely alerts.

## Features

- **Live Status Updates**: Monitor multiple custom solutions and receive real-time updates on their status.
- **Downtime Notifications**: Get notified immediately if any monitored solution experiences downtime.
- **Code Check**: Verify code integrity and get precise error messages for troubleshooting.
- **AWS CloudWatch Integration**: Leverage AWS CloudWatch for detailed infrastructure-level tracking and alerts.
- **Comprehensive Monitoring**: Ensure end-to-end monitoring of system health and performance.

## Technologies Used

- **AWS CloudWatch**: For infrastructure-level monitoring and alerts.
- **JavaScript**: For scripting and handling logic.
- **Node.js**: For backend development and server-side operations.
- **React**: For building the user interface and visualizing data.
- **Express.js**: For creating RESTful APIs and handling server requests.
- **Postman**: For API testing and validation.

## Installation

To install MTool, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TyrellF/MTool.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd MTool
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the backend server:**
   ```bash
   cd ../backend
   npm start
   ```

6. **Start the frontend application:**
   ```bash
   cd ../frontend
   npm start
   ```

## Usage

1. Access the MTool web interface at `http://localhost:3000` to view live status updates and configure monitoring settings.
2. Use the integrated code check feature to verify code integrity and receive detailed error messages.
3. Configure AWS CloudWatch settings to ensure proper infrastructure monitoring.
