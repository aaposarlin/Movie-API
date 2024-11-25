import express from 'express';

const app = express();

app.use(express.json());

app.listen(3001, () => {
    console.log('Server running in port 3001');
});

app.post('/genre', (req,res) => {
    const { name } = req.body;
    console.log({ name });
})
app.post('/movie', (req, res) => {
    const { name, year, genre } = req.body;
    console.log({ name, year, genre });
});

app.post('/register', (req, res) => {
    const { name, username, password, yearOfBirth } = req.body;
    console.log({ name, username, password, yearOfBirth });
});

app.get('/movie/:id', (req, res) => {
    const { id } = req.params;
    console.log({ id });
});

app.delete('/movie/:id', (req, res) => {
    const { id } = req.params;
    console.log({ id });
});

app.get('/movies', (req, res) => {
    const { page } = req.query;
    console.log({ page });
});

app.get('/movies/search', (req, res) => {
    const { keyword } = req.query;
    console.log({ keyword });
});

app.post('/review', (req, res) => {
    const { username, stars, reviewText, movieId } = req.body;
    console.log({ username, stars, reviewText, movieId });
});

app.post('/favorites', (req, res) => {
    const { username, movieId } = req.body;
    console.log({ username, movieId });
});

app.get('/favorites/:username', (req, res) => {
    const { username } = req.params;
    console.log({ username });
});
