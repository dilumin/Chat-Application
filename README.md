
# Chat App

## Introduction
Welcome to Chat App! This is a real-time messaging application inspired by WhatsApp. It allows users to add contacts, send messages, and enjoy secure, private conversations.


<img width="1268" alt="image" src="https://github.com/dilumin/Chat-Application/assets/77558016/02d50409-30ab-47f6-af27-126fad0962d6">


## New Features (Implemented)
- A **Social Media** Wall is Introduced for Users to add posts with/without Photos for their friends to see
- The Photos of th Posts are uploaded and retrieved from an AWS S3 Bucket 
  
  <img width="1280" alt="Screenshot 2024-08-31 232851" src="https://github.com/user-attachments/assets/e821da6d-d97f-4deb-8e0a-b5a5f95585a1">






## Features
- **User Authentication:** Secure sign-up and login using bcrypt for password hashing.
- **Real-Time Messaging:** Instant messaging between users.
- **Add Contacts:** Search for and add new contacts.
- **Chat History:** View past conversations.
- **User Status:** See who is online.
- **Profile Management:** Update user profile details and status.

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Storage:** AWS S3 Bucket 
- **Authentication:** bcrypt for password hashing
- **Real-Time Communication:** Socket.io

## Installation

### Prerequisites
- Node.js (v14 or later)
- MySQL
- npm (v6 or later)

### Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/dilumin/Chat-Application.git
    cd Chat-Application
    ```

2. **Install dependencies:**
    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Set up the database:**
    - Create a MySQL database named `chat_app`.
    - Run the SQL scripts in the mysqlQuerys.sql to create necessary tables:

4. **Configure environment variables:**
    - Create a `.env` file in the root directory of the server folder and add the following:
      
      ```bash
      PORT = ENTER_PORT
      CORS_WHITELIST = LIST_OF_ALLOWED_LINKS
      MYSQL_HOST= HOST_LINK
      MYSQL_USER = USER_NAME
      MYSQL_PASSWORD = ENTER_PASSWORD
      MY_SQL_DATABASE = ENTER_DATABASE_NAME
      ACCESS_TOKEN_SECRET = ENTER_THE_SECRET
      REFRESH_TOKEN_SECRET = ENTER_THE_SECRET
      ```
    - Alse create a `.env` file in the root directory of the Client folder and add the following:
      
      ```bash
      REACT_APP_API_URL = ENTER_URL_OF_THE_SERVER / http://localhost:3500
      ```

5. **Start the backend server:**
    ```bash
    cd server
    npm run dev
    ```

6. **Start the frontend development server:**
    ```bash
    cd client
    npm start
    ```

## Usage
1. **Sign Up:** Create a new account by providing a username, email, and password.
2. **Login:** Log in with your credentials.
3. **Add Contacts:** Search for users and add them to your contact list.
4. **Start Chatting:** Select a contact and start sending messages in real-time.

## Project Structure
```
chat-app/
├── client/                 # React frontend
│   ├── public/
│   └── src/
├── server/                 # Node.js backend
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── socket/
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes tests where applicable.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements
- Special thanks to the developers of Node.js, React, bcrypt, and MySQL for providing the tools and libraries used in this project.
