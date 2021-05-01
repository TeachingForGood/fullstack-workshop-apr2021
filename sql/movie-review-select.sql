select * from teaching_for_good.movies m
inner join movie_categories mc on m.category = mc.code and mc.code = 'sf';


select * from teaching_for_good.movies where category in (select code from movie_categories where is_obsolete = 'Y');
delete from teaching_for_good.movies where category in (select code from movie_categories where is_obsolete = 'Y');
UPDATE teaching_for_good.movies set release_date = release_date - INTERVAL 1 DAY 
where category in (select code from movie_categories where is_obsolete = 'Y');


select * from teaching_for_good.movies m
inner join movie_categories mc on m.category = mc.code 
left outer join teaching_for_good.movie_user_reviews mr on mr.movie_id = m.id
left outer join teaching_for_good.users u on u.user_name = mr.user_name;

select m.id, m.name, max(mr.rating) max_rating, min(mr.rating) min_rating, avg(mr.rating) avg_rating, round(avg(mr.rating)) avg_rating_rnd 
from teaching_for_good.movies m
inner join movie_categories mc on m.category = mc.code 
left outer join teaching_for_good.movie_user_reviews mr on mr.movie_id = m.id
left outer join teaching_for_good.users u on u.user_name = mr.user_name
group by m.id, m.name;


create view vw_movie_reviews_data as 
select m.id, m.name, max(mr.rating) max_rating, min(mr.rating) min_rating, avg(mr.rating) avg_rating, round(avg(mr.rating)) avg_rating_rnd 
from teaching_for_good.movies m
inner join movie_categories mc on m.category = mc.code 
left outer join teaching_for_good.movie_user_reviews mr on mr.movie_id = m.id
left outer join teaching_for_good.users u on u.user_name = mr.user_name
group by m.id, m.name;

select * from vw_movie_reviews_data;

