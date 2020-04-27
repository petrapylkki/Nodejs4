const express = require("express")
const tokens = require('../tokens')
const router = express.Router()

const authenticate = (req, res, next) => {
    const auth = req.headers.authorization
    const parts = auth.split(" ")
    if (tokens.verify(parts[1])){
        next()
    } else {
        res.setHeader('Content-Type', 'application/json')
        res.status(401).send({error: "Otsikkotieto puuttuu, on virheellinen tai ei sisällä voimassa olevaa tokenia."})
    }
}

router.post("*/", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    res.setHeader('Content-Type', 'application/json')
    
    if(username == "mark" && password == "giraffe") {
        const token = tokens.create(username)
        res.status(200).send({"token": token})
    } else {
        res.status(400).send({ error: "Invalid credentials"})
    }
})

module.exports = {router, authenticate}