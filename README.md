# Dashboard Management System

This project is a simple dashboard management system that allows storing, editing, and managing user data and images. Users can update their information anytime through the dashboard.

## Features

- User data storage
- User image upload and management
- User data editing
- Pagination for user listing
- Flash messages for user notifications

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **EJS (Embedded JavaScript)**: Template engine for rendering dynamic HTML
- **MongoDB**: NoSQL database for storing user data
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js
- **Multer**: Middleware for handling file uploads
- **Connect-flash**: Middleware for flash messages
- **Bootstrap**: Front-end framework for responsive design

## Installation

Follow these steps to get the project up and running on your local machine:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/dashboard-management-system.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd dashboard-management-system
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Set up MongoDB**:
    - Ensure you have MongoDB installed and running on your machine.
    - Create a `.env` file in the root of the project and add your MongoDB connection string:
        ```
        MONGODB_URI=mongodb://localhost:27017/your-database-name
        ```

5. **Run the application**:
    ```bash
    npm start
    ```

6. **Access the application**:
    - Open your web browser and navigate to `http://localhost:3000`.

## Folder Structure

├── public/  
│ ├── css/  
│ └── images/  
├── routes/  
│ └── index.js  
├── views/  
│ ├── layouts/  
│ │ └── main.ejs  
│ ├── partials/  
│ │ ├── header.ejs  
│ │ ├── footer.ejs  
│ │ └── sidebar.ejs  
│ ├── index.ejs  
│ ├── about.ejs  
│ ├── edit.ejs  
│ ├── view.ejs  
├── .env  
├── app.js  
├── package.json  
└── README.md  

## Routes

- **GET /**: Home page displaying user list with pagination.
- **GET /about**: About page.
- **GET /view/:id**: View user details.
- **GET /edit/:id**: Edit user details.
- **POST /edit/:id**: Update user details.
- **POST /edit/:id?_method=DELETE**: Delete user.