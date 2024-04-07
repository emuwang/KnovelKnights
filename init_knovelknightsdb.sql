DROP DATABASE IF EXISTS `Knovel_Knights`;
CREATE DATABASE `Knovel_Knights`;
USE `Knovel_Knights`;

CREATE TABLE books (
	title VARCHAR(128),
	author VARCHAR(128),
    rating FLOAT
);

CREATE TABLE users (
	username VARCHAR(128),
    pswd VARCHAR(8),
    salt VARCHAR(128)
);

INSERT INTO books (title, author, rating)
VALUES
('Book1', 'Author1', 9.4),
('Book2', 'Author2', 2.5),
('Book3', 'Author3', 6.4),
('Book4', 'Author4', 5.3),
('Book5', 'Author5', 3.7),
('Book6', 'Author6', 8.6),
('Book7', 'Author7', 10.0),
('Book8', 'Author8', 1.3),
('Book9', 'Author9', 9.6),
('Book10', 'Author10', 4.8),
('Book11', 'Author11', 3.9),
('Book12', 'Author12', 8.5);

ALTER TABLE books ORDER BY rating DESC;

INSERT INTO users (username, pswd, salt)
VALUES
('user1', 'hash1', 'salt1'),
('user2', 'hash2', 'salt2'),
('user3', 'hash3', 'salt3'),
('user4', 'hash4', 'salt4'),
('user5', 'hash5', 'salt5');












