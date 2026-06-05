INSERT INTO authors (name, lastname, birthday, gender, photo, city, country_id) 
    VALUES ('Samanta', 'Schweblin', 1979, 'mujer', 'https://www.latercera.com/resizer/v2/6A63S7L6RNFWPOSFJBLV3USPSY.jpg?auth=6c6b2f1c2a40b4dfd9b64702403c5d64e2927527894bc9ecd80132fd0b02866e&smart=true&width=800&height=450&quality=70', 'Buenos Aires', 9);

INSERT INTO editorials (name, country_id) VALUES ('Almadía', 1);

INSERT INTO books (name, year, read_date, status, rating, format, reading_times, purchased_date, cover, editorial_id)
    VALUES ('Distancia de rescate', 2014, ARRAY['2018-06-09', '2024-01-01'], 'leído', 'preferido', 'físico', 2, '2021', 'https://www.sopitas.com/wp-content/uploads/2014/10/Portada.jpeg', '2d7e9384-9c14-4f08-8b5f-7b12349497c0');

INSERT INTO book_authors (book_id, author_id) 
    VALUES ('f0904aa1-56d3-4066-9046-0717796520aa', '9b669f5e-b7aa-4ce1-819a-0ceac9857c33');