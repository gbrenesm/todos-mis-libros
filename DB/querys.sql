CREATE TYPE reading_status AS ENUM ('leído', 'leyendo', 'por leer');
CREATE TYPE genders AS ENUM ('mujer', 'hombre', 'no definido');
CREATE TYPE rating AS ENUM ('preferido', 'muy bueno', 'bueno', 'más o menos', 'malo');

CREATE TABLE countrys (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE countrys (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,

  continent INT NOT NULL,
  
  CONSTRAINT fk_continent
    FOREIGN KEY (continent_id)
    REFERENCES continent(id)
    ON UPDATE CASCADE
);

CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  lastaname VARCHAR(255),
  birthday VARCHAR(255),
  death VARCHAR(255),
  gender genders DEFAULT 'no definido',
  nobel_prize INT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
  deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE editorial (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,

  country INT NOT NULL,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
  deleted_at TIMESTAMP DEFAULT NULL

  CONSTRAINT fk_country
    FOREIGN KEY (country_id)
    REFERENCES country(id)
    ON UPDATE CASCADE
);

CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  read_date TEXT[],
  
  editorial UUID NOT NULL,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
  deleted_at TIMESTAMP DEFAULT NULL

  CONSTRAINT fk_editorial
    FOREIGN KEY (editorial_id)
    REFERENCES editorials(id)
    ON UPDATE CASCADE
);

CREATE TABLE book_authors (
  book_id UUID NOT NULL,
  author_id UUID NOT NULL,

  PRIMARY KEY (book_id, author_id),

  CONSTRAINT fk_book
    FOREIGN KEY (book_id)
    REFERENCES books(id)
    ON UPDATE CASCADE,

    CONSTRAINT fk_author
    FOREIGN KEY (author_id)
    REFERENCES authors(id)
    ON UPDATE CASCADE
);