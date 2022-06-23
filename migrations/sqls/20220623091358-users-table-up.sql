-- CREATE TABLE USERS
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50),
    username VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(250) NOT NULL
)