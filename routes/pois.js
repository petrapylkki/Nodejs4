const express = require("express")
const db = require("../db.js")
const Poi = require("../poi").Poi
const router = express.Router()

router.get("/api/v1/pois", (req, res) => {
    const pois = db.getPoi()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(pois)
})

router.get("/api/v1/pois/:id/", (req, res) => {
    const pois = db.getPoi(req.params.id)
    if (pois) {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(pois)
    } else {
        res.status(404).send({error: "Id:tä ei ole"})
    }
})

router.post("*/", (req, res) => {
    try {
        const newPoi = new Poi(req.body.name, req.body.description, req.body.city, req.body.coordinates)
        const pois = db.setPoi(undefined, newPoi)
        res.setHeader('Content-Type', 'application/json')
        res.status(201).send(pois)
    } catch (e) {
        res.status(400).send({error: "POI-tiedot virheelliset"})
    }
})

router.put("*/:id/", (req, res) => {
    try {
        const ifPoiExists = db.getPoi(req.params.id)
        const statusCode = ifPoiExists ? 200 : 201
        const poi = new Poi(req.body.name, req.body.description, req.body.city, req.body.coordinates)
        const pois = db.setPoi(req.params.id, poi)

        res.setHeader('Content-Type', 'application/json')
        res.status(statusCode).send(pois)
    } catch (e) {
        res.status(400).send({error: "POI-tiedot virheelliset"})
    }
})

router.delete("*/:id/", (req, res) => {
    const poi = db.getPoi(req.params.id)
    res.setHeader('Content-Type', 'application/json')
    if(poi) {
        db.deletePoi(req.params.id);
        res.status(204).send({message: "Poistettu"})
    } else {
        res.status(404).send({error: "Id:tä' ei ole"})
    }
})

module.exports = router