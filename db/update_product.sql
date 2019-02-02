update products
set name = $2
where id = $1;
update products
set price = $3
where id = $1;
update products
set img = $4
where id = $1;
select * from products;