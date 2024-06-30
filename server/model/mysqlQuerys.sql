CREATE DATABASE IF NOT EXISTS chat_app;

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Chats (
    chat_id INT PRIMARY KEY AUTO_INCREMENT,
    group_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    chat_id INT,
    user_id INT,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


CREATE TABLE Group_Members (
    chat_id INT,
    user_id INT,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (chat_id, user_id),
    FOREIGN KEY (chat_id) REFERENCES Chats(chat_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS RefreshTokens (
            user_id INT,
            refresh_token VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS FriendList (
            user_email VARCHAR(50),
            chat_id INT PRIMARY KEY AUTO_INCREMENT,
            friend_email VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_email) REFERENCES Users(email),
            FOREIGN KEY (friend_email) REFERENCES Users(email)
);

CREATE TABLE IF NOT EXISTS FriendRequests (
            user_email VARCHAR(100),
            friend_email VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);







