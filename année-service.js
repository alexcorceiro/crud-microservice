const express  = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())

let annees = [ 
    {id: 1, annee:"1945"},
    {id: 2, annee:"1975"},
    {id: 3, annee:"1785"},
    {id: 4, annee:"2323"}
]

app.get("/annee", async (req, res) => {
    res.json(annees)
})

app.get("/annee/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const annee = annees.find(annee => annee.id === id)

    if(annee){
       res.json(annee)
    }else{
        res.status(404).json({ error: 'annee non trouver'})
    }
})

app.post("/annee", async (req, res) => {
    const {annee} = req.body
    const id = annees.length ? annees[annees.length - 1].id + 1 :1;

    annees.push({id, annee})
    res.status(201).json({ message: "annee ajouter"})
})

app.put('/annee/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    const { annee } = req.body
    const anneeId = annees.findIndex(annee => annee.id === id)

    annees[anneeId] = {id, annee}
    res.json({ message: "annee mis a jour "})
})

app.delete('/annee/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const annee = annees.findIndex(annee => annee.id === id);

    annees.splice(annee)

    res.json({ message: "annee supprimer"})
})

app.listen(6000, () => {
    console.log("server annee demarer")
})