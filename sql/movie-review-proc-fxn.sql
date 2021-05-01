DROP FUNCTION `teaching_for_good`.`full_name`;
DELIMITER $$

CREATE FUNCTION full_name(first_name varchar(45), last_name varchar(45)) 
RETURNS varchar(90)
DETERMINISTIC
BEGIN
	DECLARE full_name varchar(90);
	SET full_name = CONCAT(first_name, ' ', last_name);
	RETURN full_name;
END$$
DELIMITER ;

DELIMITER $$

SELECT full_name(first_name, last_name) FROM teaching_for_good.users;






DROP PROCEDURE `teaching_for_good`.`GetMovieReviewByCategory`;

DELIMITER $$

CREATE PROCEDURE GetMovieReviewByCategory (
	IN  movieCategory VARCHAR(25),
	OUT reviewCount INT
)
BEGIN
	SELECT count(*) INTO reviewCount
    FROM teaching_for_good.movies 
    where category = movieCategory
    group by category;
END$$

DELIMITER ;

CALL GetMovieReviewByCategory('am', @moviewReviewCount);
SELECT @moviewReviewCount;