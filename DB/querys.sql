CREATE TYPE reading_status AS ENUM ('leído', 'leyendo', 'por leer');
CREATE TYPE genders AS ENUM ('mujer', 'hombre', 'no definido');
CREATE TYPE ratings AS ENUM ('preferido', 'muy bueno', 'bueno', 'más o menos', 'malo');
CREATE TYPE formats AS ENUM ('físico', 'digital', 'audiolibro');

CREATE TABLE continents (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO continents (name) VALUES ('África'), ('América'), ('Asia'), ('Europa'), ('Oceanía');

CREATE TABLE countrys (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  name_en VARCHAR(255),

  continent_id INT NOT NULL,

  CONSTRAINT fk_continent
    FOREIGN KEY (continent_id)
    REFERENCES continents(id)
    ON UPDATE CASCADE
);

CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  lastname VARCHAR(255),
  birthday INT,
  death INT,
  gender genders DEFAULT 'no definido',
  nobel_prize INT,
  photo VARCHAR(255),
  city VARCHAR(255),

  country_id INT NOT NULL,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP DEFAULT NULL,

  CONSTRAINT fk_country
    FOREIGN KEY (country_id)
    REFERENCES countrys(id)
    ON UPDATE CASCADE
);

CREATE TABLE editorials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,

  country_id INT NOT NULL,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP DEFAULT NULL,

  CONSTRAINT fk_country
    FOREIGN KEY (country_id)
    REFERENCES countrys(id)
    ON UPDATE CASCADE
);

CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  read_date TEXT[],
  status reading_status DEFAULT 'por leer',
  rating ratings DEFAULT 'bueno',
  format formats DEFAULT 'físico',
  reading_times INT DEFAULT 0,
  purchased_date INT,
  fiction BOOLEAN DEFAULT true,
  cover VARCHAR(255),
  in_library BOOLEAN DEFAULT true,

  editorial_id UUID NOT NULL,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP DEFAULT NULL,

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

CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote TEXT NOT NULL,
    pages VARCHAR(255),
    libreta BOOLEAN DEFAULT false,

    book_id UUID NOT NULL,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,

    CONSTRAINT fk_book
      FOREIGN KEY (book_id)
      REFERENCES books(id)
      ON UPDATE CASCADE
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE tags_books (
    tag_id UUID NOT NULL,
    book_id UUID NOT NULL,

    PRIMARY KEY (book_id, tag_id),

    CONSTRAINT fk_book
      FOREIGN KEY (book_id)
      REFERENCES books(id)
      ON UPDATE CASCADE,

    CONSTRAINT fk_tag
      FOREIGN KEY (tag_id)
      REFERENCES tags(id)
      ON UPDATE CASCADE
);

CREATE INDEX idx_books_name ON books(name);
CREATE INDEX idx_authors_name ON authors(name);
CREATE INDEX idx_authors_lastname ON authors(lastname);
CREATE INDEX idx_editorials_name ON editorials(name);