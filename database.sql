CREATE TABLE Genre (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

INSERT INTO Genre (name) VALUES
('Comedy'),
('Fantasy'),
('Horror'),
('Scifi'),
('Action'),
('Thriller');

CREATE TABLE Movie (
    movie_id SERIAL PRIMARY KEY,
    movie_name VARCHAR(255),
    movie_year INT,
    genre_id INT,
    FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
);

INSERT INTO Movie (movie_name, movie_year, genre_id) VALUES
('Alien', 1979, 4),
('The Dark Knight', 2008, 5),
('Total Recall', 1990, 4),
('The Terminator', 1984, 5),
('The Mask', 1994, 1),
('Liar Liar', 1997, 1),
('The Hobbit: An Unexpected Journey', 2012, 2),
('Joker', 2019, 6),
('Lord Of The Rings: The Two Towers', 2002, 2),
('Cold Pursuit', 2019, 6),
('The Crow', 2024, 3),
('Smile', 2022, 3);

CREATE TABLE Reviewer (
    reviewer_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    birthyear INT
);

INSERT INTO Reviewer (name, username, password, birthyear) VALUES
('Aapo Sarlin', 'aaposar', 'salasana123', 2000),
('Homer Simpson', 'homersim', 'salasana321', 1956),
('Lisa Simpson', 'Lisasim', 'password123', 1979),
('Marge Simpson', 'margesim', 'password321', 1955);

CREATE TABLE Review (
    review_id SERIAL PRIMARY KEY,
    reviewer_id INT,
    movie_id INT,
    stars INT,
    review_text TEXT,
    FOREIGN KEY (reviewer_id) REFERENCES Reviewer(reviewer_id),
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
);

CREATE TABLE FavoriteMovies (
    reviewer_id INT,
    movie_id INT,
    FOREIGN KEY (reviewer_id) REFERENCES Reviewer(reviewer_id),
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
);