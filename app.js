const express = require("express")
const bodyParser = require('body-parser')
const auth = require("./routes/auth")
const pois = require("./routes/pois")
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/v1/pois", pois)
app.get("/api/v1/pois/:id", pois)
app.post("/api/v1/pois", auth.authenticate, pois)
app.put("/api/v1/pois/:id", auth.authenticate, pois)
app.delete("/api/v1/pois/:id", auth.authenticate, pois)
app.post("/api/v1/auth", auth.router)

app.listen(port)