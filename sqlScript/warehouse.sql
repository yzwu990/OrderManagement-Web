/*------------------------------------------------------------------
# Author: Boling Zhang
# CST8285 Web Programming
# Assignment 2
# sql script for database DDL and DML
# There are three tables will be created and used in this assignment
-------------------------------------------------------------------*/

/* DDL - create database and tables */

-- create database for warehouse
DROP DATABASE IF EXISTS warehouse ;
CREATE DATABASE IF NOT EXISTS warehouse ;

USE WAREHOUSE;

-- create items table
CREATE TABLE item (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(100),
    price DECIMAL(10,2),
    quantity INT, 
    size varchar(15),
    color varchar(15),
    location varchar(55),
    status varchar(30),
    intake_date date
);


-- create users table
-- username: less than 20 characters
-- at least 6 characters, at least 1 uppercase letter and at least 1 lowercase letter

CREATE TABLE user (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(19),
    password varchar(100)
);


-- create administrators table
-- username: less than 20 characters
-- at least 6 characters, at least 1 uppercase letter and at least 1 lowercase letter
CREATE TABLE admin (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(19),
    password varchar(100)
);

/* DML - insert records into tables */

-- populate the items table
INSERT INTO item (ID, name, price, quantity, size, color, location, status, intake_date)
VALUES
('1', 'Jacket', '123.4', '20', 'L', 'black', 'A1', 'in stock', '2021-10-10'),
('2', 'Jacket', '123.4', '50', 'M', 'pink', 'A2', 'in stock', '2021-10-20'),
('3', 'Shirt', '50.5', '30', 'S', 'white', 'A3', 'in stock', '2021-10-15'),
('4', 'Shirt', '38', '0', 'M', 'yellow', 'A4', 'sold out', '2021-10-16'),
('5', 'Bikini', '150', '7', 'S', 'blue', 'B1', 'in stock', '2021-11-02'),
('6', 'Bikini', '150', '12', 'M', 'black', 'B1', 'in stock', '2021-11-03'),
('7', 'Suit', '530', '100', 'XL', 'black', 'B2', 'in stock', '2021-11-10'),
('8', 'Suit', '530', '0', 'M', 'green', 'B2', 'sold out', '2021-10-10');


-- populate the users table
-- username: less than 20 characters
-- at least 6 characters, at least 1 uppercase letter and at least 1 lowercase letter
INSERT INTO user (ID, username, password)
VALUES 
('1', 'test001', 'Test111'),
('2', 'test002', 'Test222'),
('3', 'test003', 'Test333');


-- populate the admins table
-- username: less than 20 characters
-- at least 6 characters, at least 1 uppercase letter and at least 1 lowercase letter
INSERT INTO admin (ID, username, password)
VALUES
('1', 'admin01', 'Admin111'),
('2', 'admin02', 'Admin222'),
('3', 'admin03', 'Admin333');



/*------------------------------------------------------------------
# END OF FILE
# Author: Boling Zhang
-------------------------------------------------------------------*/

