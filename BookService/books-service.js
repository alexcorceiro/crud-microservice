const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { title } = require('process');

const app = express();

app.use(bodyParser.json());

let books = [
    { id: 1, title: "Livre 1", authorId: 1, categoryId: 1},
    { id: 2, title: "Livre 2", authorId: 2, categoryId: 2},
    { id: 3, title: "Livre 3", authorId: 3, categoryId: 3},
    { id: 4, title: "Livre 4", authorId: 4, categoryId: 4},
];

app.get('/books', async (req, res) => {
    res.json(books)
});

app.get('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);

    if(book){
        try {
            const authorResponse = await axios.get(`http://localhost:4000/authors/${book.authorId}`);
            const categoryResponse = await axios.get(`http://localhost:5000/categories/${book.categoryId}`);
            const author = authorResponse.data;
            const category = categoryResponse.data;

            const bookDetails = {
                id: book.id,
                title: book.title,
                author: author.name,
                category: category.name
            };

            res.json(bookDetails);

        } catch (error){
        res.status(500).json({error: 'Erreur lors de la récupération des détails du livre'});
        }      
    }
    else{
        res.status(404).json({error: 'Livre non trouvé'});
    }
});

// add book
app.post('/books', (req, res) => {
    const { title, authorId, categoryId } = req.body;
    const id = books.length ? books[books.length - 1].id + 1 : 1;
    const book = { id, title, authorId, categoryId };
  
    books.push(book);
    res.status(201).json(book);
});

// modify book
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, authorId, categoryId } = req.body;
  
    let book = books.find(book => book.id === id);
  
    if (!book) return res.status(404).json({ message: 'Livre non trouvé.' });
  
    book.title = title;
    book.authorId = authorId;
    book.categoryId = categoryId;
  
    res.status(200).json(book);
  });
  
  // delete book
  app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let book = books.find(book => book.id === id);
  
    if (!book) return res.status(404).json({ message: 'Livre non trouvé.' });
  
    books = books.filter(book => book.id !== id);
    res.status(200).json({ message: 'Livre supprimé.' });
  });

app.listen(3000, () => {
    console.log("Microservices de gestion des livres démarré sur le port 3000");
});