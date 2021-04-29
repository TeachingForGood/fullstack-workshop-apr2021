DROP TRIGGER movie_names_caps_trg;
CREATE TRIGGER movie_names_caps_trg
BEFORE INSERT ON movies FOR EACH ROW
SET NEW.NAME = TRIM(NEW.NAME);

DROP TRIGGER theatre_movie_map_history_trg;
CREATE TRIGGER theatre_movie_map_history_trg
AFTER INSERT ON theatre_movie_map FOR EACH ROW
INSERT INTO `teaching_for_good`.`theatre_movie_map_history`(`theatre_movie_map_id`, `theatre_id`, `movie_id`, `show_start_date`, `show_end_date`) 
VALUE (NEW.ID, NEW.theatre_id, NEW.movie_id, NEW.show_start_date, NEW.show_end_date);
