INSERT INTO `teaching_for_good`.`movie_categories` (`code`, `description`, `comment`) VALUES ('hr', 'Horror', 'Scary Movies');
INSERT INTO `teaching_for_good`.`movie_categories` VALUES ('am', 'Anime', 'Animation Movies','N');

UPDATE `teaching_for_good`.`movie_categories` SET is_obsolete = 'N'
UPDATE `teaching_for_good`.`movie_categories` SET `is_obsolete` = 'Y' WHERE (`code` = 'cl');

DELETE FROM `teaching_for_good`.`movie_categories` WHERE (`code` = 'cl');

INSERT INTO `teaching_for_good`.`movies` (`name`, `category`, `release_date`) VALUES ('How To Train Your Dragon', 'am', '2010-03-21');
INSERT INTO `teaching_for_good`.`movies` (`name`, `category`, `release_date`) VALUES ('Big Hero 6', 'am', '2014-12-07');
INSERT INTO `teaching_for_good`.`movies` (`name`, `category`, `release_date`) VALUES ('The Nun', 'hr', '2018-09-07');
INSERT INTO `teaching_for_good`.`movies` (`name`, `category`, `release_date`) VALUES ('The Conjuring', 'hr', '2013-07-19');
INSERT INTO `teaching_for_good`.`movies` (`name`, `category`, `release_date`) VALUES ('Annabelle', 'hr', '2014-10-03');
INSERT INTO `teaching_for_good`.`movies` (`name`, `category`, `release_date`) VALUES ('The Unchanging Sea', 'cl', '1910-05-05');
INSERT INTO `teaching_for_good`.`movies` (`name`, `category`, `release_date`) VALUES ('The Lonedale Operator', 'cl', '1911-03-23');

INSERT INTO `teaching_for_good`.`theatres` (`name`, `street_name_1`, `city`, `state`, `zip5`) VALUES ('Warehouse Cinemas', '1301 W Patrick St', 'Frederick', 'MD', '21001');
INSERT INTO `teaching_for_good`.`theatres` (`name`, `street_name_1`, `city`, `state`, `zip5`) VALUES ('Maryland Ensemble Theatre\n', '31 W Patrick St', 'Frederick', 'MD', '23097');
INSERT INTO `teaching_for_good`.`theatres` (`name`, `street_name_1`, `city`, `state`, `zip5`) VALUES ('Cinemark Egyptian', '111 Main St', 'Hanover', 'MD', '20837');
INSERT INTO `teaching_for_good`.`theatres` (`name`, `street_name_1`, `city`, `state`, `zip5`) VALUES ('AMC', '9728 Front St', 'Columbia', 'MD', '28374');
INSERT INTO `teaching_for_good`.`theatres` (`name`, `street_name_1`, `city`, `state`, `zip5`) VALUES ('UA Cinemas', '8012 High St', 'Princeton', 'NJ', '08765');
INSERT INTO `teaching_for_good`.`theatres` (`name`, `street_name_1`, `city`, `state`, `zip5`) VALUES ('Local Cinemas', '87 Downtown Ln', 'New Brunswick', 'NJ', '05838');

INSERT INTO `teaching_for_good`.`users` (`user_name`, `first_name`, `last_name`, `email`) VALUES ('rpandian', 'Rajesh', 'Pandian', 'rajesh.pandian@softrams.com');
INSERT INTO `teaching_for_good`.`users` (`user_name`, `first_name`, `last_name`, `email`) VALUES ('kloftus', 'Kevin', 'Loftus', 'Kevin.Loftus@softrams.com');

