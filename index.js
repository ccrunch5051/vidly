const express = require('express');
const Joi = require('@hapi/joi');

const app = express();

// Middleware
app.use(express.json());

// genres list
const genres = [
    { id: 1, name: 'Comedy' },
    { id: 2, name: 'Fantasy' },
    { id: 3, name: 'Crime' },
    { id: 4, name: 'Drama' },
    { id: 5, name: 'Music' },
]

// routes
app.get('/', (req, res) => res.send('Hello World!'));

// ===== CRUD =====

// Create
app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

// Read
app.get('/api/genres', (req, res) => res.send(genres));

// Update
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);
});

// Delete
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

function validateGenre(body) {
    const schema = {
        name: Joi.string().min(3).max(30).required()
    }
    return Joi.validate(body, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));