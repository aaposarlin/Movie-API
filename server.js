import express from 'express';
import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.listen(3320, () => {
    console.log('Server running in port 3320');
});

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PW,
  port: process.env.PG_PORT,
});


client.connect()
  .then(() => console.log('Connection to postrgesql was succesful!'))
  .catch((err) => console.error('Error in postgresql connection!:', err.stack));


app.get('/genre', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM Genre');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.post('/genre', async (req, res) => {
    const { name } = req.body;
  
    const query = 'INSERT INTO Genre (name) VALUES ($1)';
    const values = [name];
  
    try {
      await client.query(query, values);
      res.status(201).send('Genre added succesfully');
    } catch (err) {
      console.error('Cant add genre:', err);
      res.status(500).send('Error');
    }
  });

  app.delete('/genre/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await client.query('DELETE FROM Genre WHERE genre_id = $1', [id]);
      if (result.rowCount === 0) {
        return res.status(404).send('Genre not found');
      }
      res.status(200).send('Genre removed succesfully');
    } catch (err) {
      console.error('Cant delete genre:', err);
      res.status(500).send('Error');
    }
  });
  
  

app.get('/movie', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM Movie');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  });

  app.post('/movie', async (req, res) => {
    const { movie_name, movie_year, genre_id } = req.body;
  
    const query = 'INSERT INTO Movie (movie_name, movie_year, genre_id) VALUES ($1, $2, $3)';
    const values = [movie_name, movie_year, genre_id];
  
    try {
      await client.query(query, values);
      res.status(201).send('Movie added succesfully');
    } catch (err) {
      console.error('Cant add movie:', err);
      res.status(500).send('Error');
    }
  });

  app.get('/movie/search', async (req, res) => {
    const { keyword } = req.query;
    try {
      const result = await client.query('SELECT * FROM Movie WHERE movie_name ILIKE $1', [`%${keyword}%`]);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  });

  app.get('/movie/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('SELECT * FROM Movie WHERE movie_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Movie not found');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});
  
  app.delete('/movie/:id', async (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM Movie WHERE movie_id = $1';
    const values = [id];
  
    try {
      const result = await client.query(query, values);
      if (result.rowCount === 0) {
        return res.status(404).send('Movie not found');
      }
      res.status(200).send('Movie removed succesfully');
    } catch (err) {
      console.error('Cant delete movie:', err);
      res.status(500).send('Error');
    }
  });
  

app.get('/reviewer', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Reviewer');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post('/review', async (req, res) => {
    const { username, stars, reviewText, movieId } = req.body;
  
    const reviewerResult = await client.query('SELECT reviewer_id FROM Reviewer WHERE username = $1', [username]);
    if (reviewerResult.rows.length === 0) {
      return res.status(404).send('Käyttäjää ei löytynyt');
    }
    const reviewerId = reviewerResult.rows[0].reviewer_id;
  
    const query = 'INSERT INTO Review (reviewer_id, movie_id, stars, review_text) VALUES ($1, $2, $3, $4)';
    const values = [reviewerId, movieId, stars, reviewText];
  
    try {
      await client.query(query, values);
      res.status(201).send('review added succesfully');
    } catch (err) {
      console.error('error:', err);
      res.status(500).send('Error');
    }
  });

  app.post('/favorites', async (req, res) => {
    const { username, movieId } = req.body;
  
    
    const reviewerResult = await client.query('SELECT reviewer_id FROM Reviewer WHERE username = $1', [username]);
    if (reviewerResult.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    const reviewerId = reviewerResult.rows[0].reviewer_id;
  
    const query = 'INSERT INTO FavoriteMovies (reviewer_id, movie_id) VALUES ($1, $2)';
    const values = [reviewerId, movieId];
  
    try {
      await client.query(query, values);
      res.status(201).send('Favorite movie added');
    } catch (err) {
      console.error('Cant add favorite movie:', err);
      res.status(500).send('Error');
    }
  });

  app.get('/favorites/:username', async (req, res) => {
  const { username } = req.params;
  

  const reviewerResult = await client.query('SELECT reviewer_id FROM Reviewer WHERE username = $1', [username]);
  if (reviewerResult.rows.length === 0) {
    return res.status(404).send('User not Found');
  }
  const reviewerId = reviewerResult.rows[0].reviewer_id;

  try {
    const result = await client.query('SELECT * FROM Movie m JOIN FavoriteMovies f ON m.movie_id = f.movie_id WHERE f.reviewer_id = $1', [reviewerId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});


app.get('/movie/genre/:genre_id', async (req, res) => {
    const { genre_id } = req.params;
    try {
      const result = await client.query('SELECT * FROM Movie WHERE genre_id = $1', [genre_id]);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  });

  app.post('/register', async (req, res) => {
    const { name, username, password, yearOfBirth } = req.body;
  
    const query = 'INSERT INTO Reviewer (name, username, password, birthyear) VALUES ($1, $2, $3, $4)';
    const values = [name, username, password, yearOfBirth];
  
    try {
      await client.query(query, values);
      res.status(201).send('new user added succesfully');
    } catch (err) {
      console.error('Cant register new user:', err);
      res.status(500).send('Error');
    }
  });
  