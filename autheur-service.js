const express  = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())

let auteurs = [ 
    {id: 1, name:"bira"},
    {id: 2, name:"paul"},
    {id: 3, name:"flobert"},
    {id: 4, name:"bou"}
]

app.get("/auteur", async (req, res) => {
    res.json(auteurs)
})

app.get("/auteur/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const auteur = auteurs.find(auteur => auteur.id === id)

    if(auteur){
       res.json(auteur)
    }else{
        res.status(404).json({ error: 'auteur non trouver'})
    }
});

app.post("/auteur", async (req, res) => {
    const {auteur} = req.body
    const id = auteurs.length ? auteurs[auteurs.length - 1].id + 1 :1;

    auteurs.push({id, auteur})
    res.status(201).json({ message: "auteur ajouter"})
})

app.put('/auteur/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    const { auteur } = req.body
    const auteurId = auteurs.findIndex(auteur => auteur.id === id)

    auteurs[auteurId] = {id, auteur}
    res.json({ message: "auteur mis a jour "})
})

app.delete('/auteur/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const auteur = auteurs.findIndex(auteur => auteur.id === id);

    auteurs.splice(auteur)

    res.json({ message: "auteur supprimer"})
})


app.listen(4000, () => {
    console.log("server auteur demarer")
})