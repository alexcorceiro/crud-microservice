const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())

let books = [
    {id:1 , titre: "le roi lion", auteurId: 1, categoryId:1, anneeId: 1},
    {id:2 , titre: "aladin", auteurId: 2, categoryId:2, anneeId: 2},
    {id:3 , titre: "peter pan", auteurId: 3, categoryId:3, anneeId: 3},
    {id:4 , titre: "mougli", auteurId: 4, categoryId:4, anneeId: 4},
]

app.get("/books", async (req, res) => {
  res.json(books)
})

app.get('/book/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const book = books.find(book => book.id === id)

    if(book){
        try {
        const auteurIdResponse = await axios.get(`http://localhost:4000/auteur/${book.auteurId}`)
        const categoryIdResponse = await axios.get(`http://localhost:5000/category/${book.categoryId}`)
        const anneeIdResponse = await axios.get(`http://localhost:6000/annee/${book.anneeId}`)
        const auteur = auteurIdResponse.data
        const category = categoryIdResponse.data
        const annee = anneeIdResponse.data

        const bookDetail = {
            id: book.id,
            titre: book.titre,
            autheur: auteur.name, 
            category: category.name,
            annee: annee.annee
        }

        res.status(200).json(bookDetail)


        }catch(err){
            res.status(500).json({message: "erreur"})
        }
    } else {
        res.status(404).json({error: "livre non trouve"})
    }
})


app.post("/book",  async (req, res) => {
   const {titre, auteurId, categoryId, anneeId } = req.body
   const id = books.length ? books[books.length - 1].id + 1 :1;
   
   try{
    await axios.get(`http://localhost:4000/auteur/${auteurId}`)
    await axios.get(`http://localhost:5000/category/${categoryId}`)
    await axios.get(`http://localhost:6000/annee/${anneeId}`)

    books.push({ id, titre, auteurId, categoryId, anneeId})

    res.status(200).json({ message: "livre ajouter "})
   }catch(err){
    return res.status(400).json({ message: err.message})
   }
})

app.put("/book/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const { titre, auteurId, categoryId, anneeId } = req.body
    const book =  books.find(book => book.id === id)

    try{
        await axios.get(`http://localhost:4000/auteur/${auteurId}`)
        await axios.get(`http://localhost:5000/category/${categoryId}`)
        await axios.get(`http://localhost:6000/annee/${anneeId}`)  

        books[book] = {id, titre, auteurId, categoryId, anneeId}
        res.status(201).json({ message: 'livre mis a jour'})
    }catch(err){
        return res.status(400).json({ message: err.message})
    }
})

app.delete("/book/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const book = books.find(book => book.id === id)

    books.filter(book)
    res.status(201).json({ message: 'livre supprimer'})
})

app.listen(3000, () => {
    console.log('server demarer')
})