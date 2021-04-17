
CREATE TABLE `movie_categories` (
  `code` char(2) NOT NULL,
  `description` varchar(45) NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`code`));


CREATE TABLE `teaching_for_good`.`movies` (
  `id` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `category` CHAR(2) NOT NULL,
  `release_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `categories_FK_idx` (`category` ASC) VISIBLE,
  CONSTRAINT `categories_FK`
    FOREIGN KEY (`category`)
    REFERENCES `teaching_for_good`.`movie_categories` (`code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `teaching_for_good`.`theatres` (
  `id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `street_name_1` VARCHAR(200) NOT NULL,
  `street_name_2` VARCHAR(200) NULL,
  `city` VARCHAR(100) NOT NULL,
  `zip5` CHAR(5) NOT NULL,
  `zip4` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `teaching_for_good`.`theatre_movie_map` (
  `id` INT NOT NULL,
  `theatre_id` INT NOT NULL,
  `movie_id` INT NOT NULL,
  `show_start_date` DATETIME NULL,
  `show_end_date` DATETIME NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `teaching_for_good`.`theatre_movie_map` 
ADD INDEX `theatre_FK_idx` (`theatre_id` ASC) VISIBLE,
ADD INDEX `movie_FK_idx` (`movie_id` ASC) VISIBLE;

ALTER TABLE `teaching_for_good`.`theatre_movie_map` 
ADD CONSTRAINT `theatre_FK`
  FOREIGN KEY (`theatre_id`)
  REFERENCES `teaching_for_good`.`theatres` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `movie_FK`
  FOREIGN KEY (`movie_id`)
  REFERENCES `teaching_for_good`.`movies` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


CREATE TABLE `teaching_for_good`.`theatre_movie_show_times` (
  `id` INT NOT NULL,
  `theatre_movie_map_id` INT NOT NULL,
  `show_time` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `theatre_movie_map_FK_idx` (`theatre_movie_map_id` ASC) VISIBLE,
  CONSTRAINT `theatre_movie_map_FK`
    FOREIGN KEY (`theatre_movie_map_id`)
    REFERENCES `teaching_for_good`.`theatre_movie_map` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `teaching_for_good`.`users` (
  `user_name` VARCHAR(50) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_name`));

CREATE TABLE `teaching_for_good`.`movie_user_reviews` (
  `id` INT NOT NULL,
  `user_name` VARCHAR(50) NOT NULL,
  `movie_id` INT NOT NULL,
  `rating` INT NOT NULL,
  `comments` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`),
  INDEX `user_name_FK_idx` (`user_name` ASC) VISIBLE,
  INDEX `movie_id_idx` (`movie_id` ASC) VISIBLE,
  CONSTRAINT `user_name_FK`
    FOREIGN KEY (`user_name`)
    REFERENCES `teaching_for_good`.`users` (`user_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `movie_id`
    FOREIGN KEY (`movie_id`)
    REFERENCES `teaching_for_good`.`movies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
