CREATE SCHEMA `students` ;

CREATE TABLE `students`.`student_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `age` INT NULL,
  `gender` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
