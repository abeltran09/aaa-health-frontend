# AAA-Health Frontend Application Setup Guide

Follow the steps below to set up the development environment and run the application on your mobile device.

## 1. Install Node.js (v22.11.0 LTS)

You need to have **Node.js v22.11.0 (LTS)** installed to run the application.

- **Download Node.js**:  
  Go to [Node.js Downloads](https://nodejs.org/en/download/prebuilt-installer) and select the correct version based on your operating system and architecture.
  
- **Verify Installation**:
  Once the download is complete, open a terminal and run the following command to verify the installation:
  ```
  node -v
  ```
  It should return
  ```
  v22.11.0
  ```

## 2. Install Expo Go on your Phone
- Download Expo Go from your app store (available for both iOS and Android). This app will allow you to view the application during development.

## 3. Clone the Repository
To get the code for this project, clone the repository to your local machine using Git.
```
git clone <repository-url>
```

## 4. Start Application
- Navigate to the projecvt directory
  ```
  cd app
  ```
- Install project dependencies
  ```
  npm install
  ```
- Start the application
  ```
  npx expo start
  ```

## 5. View the Application on Your Phone
- Open the Expo Go app on your mobile device.
- Scan the QR code displayed in the terminal after running npx expo start.
- You should now see the application running on your phone.
Note: Ensure that your mobile device and your computer are connected to the same network.
