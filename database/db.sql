CREATE DATABASE todo_App;

USE todo_App;

CREATE TABLE `user`(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(20) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL
);

CREATE TABLE `task`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  idUser INT(11) NOT NULL,
  FOREIGN KEY(idUser) REFERENCES `user`(id)
);


INSERT INTO `user`(firstname, lastname, email)
  VALUES('Rogelio', 'Trejo Estrada', 'test@test.com');
