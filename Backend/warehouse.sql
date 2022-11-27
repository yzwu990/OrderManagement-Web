-- author: Boling Zhang
-- Date: 2022-11-24

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
CREATE TABLE user (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(100),
    password varchar(5)
);


-- create administrators table
CREATE TABLE admin (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(100),
    password varchar(5)
);

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
INSERT INTO user (ID, name, password)
VALUES 
('1', 'Sally', 'abcde'),
('2', 'John', '12345'),
('3', 'Bob', 'abc12'),
('4', 'Beth', 'aaa12'),
('5', 'Selina', 'qwert'),
('6', 'Juliet', '12345');

-- populate the admins table
INSERT INTO admin (ID, name, password)
VALUES
('1', 'Mary', 'abcde'),
('2', 'Tim', 'abcde'),
('3', 'Jake', 'abcde');

select * from user;

