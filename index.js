const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = 5000;
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;



const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dvubr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const booksCollection = client.db("the-book-loft").collection("books");

    app.get('/books', (req, res) => {
       booksCollection.find({})
       .toArray((err, documents) => {
           res.send(documents);
       }) 
    })

    app.get('/book/:id', (req, res) => {
        const id = req.params.id;
        booksCollection.find({_id: ObjectId(id)})
        .toArray((err, documents) => {
            res.send(documents[0]);
        }) 
    })
    

    app.post('/addBook', (req, res) => {
        const book = req.body;
        booksCollection.insertOne(book, (err, result) => {
            res.send(result);
        })
    })

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
});


app.listen(process.env.PORT || port );