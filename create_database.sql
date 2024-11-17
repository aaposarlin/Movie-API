CREATE TABLE Genre (
    genre_id INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE Movie (
    movie_id INT PRIMARY KEY,
    name VARCHAR(255),
    year INT,
    genre_id INT,
    FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
);

CREATE TABLE Reviewer (
    reviewer_id INT PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    birth_year INT
);

CREATE TABLE Review (
    review_id INT PRIMARY KEY,
    reviewer_id INT,
    movie_id INT,
    stars INT,
    review_text TEXT,
    FOREIGN KEY (reviewer_id) REFERENCES Reviewer(reviewer_id),
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
);