const express  = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())

let categorys = [ 
    {id: 1, name:"disnay"},
    {id: 2, name:"disnay"},
    {id: 3, name:"disnay"},
    {id: 4, name:"disnay"}
]

app.get("/category", async (req, res) => {
    res.json(categorys)
})

app.get("/category/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const category = categorys.find(category => category.id === id)

    if(category){
       res.json(category)
    }else{
        res.status(404).json({ error: 'category non trouver'})
    }
});

app.post("/category", async (req, res) => {
    const {category} = req.body
    const id = categorys.length ? categorys[categorys.length - 1].id + 1 :1;

    categorys.push({id, category})
    res.status(201).json({ message: "category ajouter"})
})

app.put('/category/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    const { category } = req.body
    const categoryId = categorys.findIndex(category => category.id === id)

    categorys[categoryId] = {id, category}
    res.json({ message: "category mis a jour "})
})

app.delete('/category/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const category = categorys.findIndex(category => category.id === id);

    categorys.splice(category)

    res.json({ message: "category supprimer"})
})

app.listen(5000, () => {
    console.log("server category demarer")
})