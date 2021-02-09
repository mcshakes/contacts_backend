const { request } = require("express");
const morgan = require("morgan");
const express = require("express")
const mongoose = require("mongoose");
require('dotenv').config()

const MONGO_URI = process.env.MONGODB_URI

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const app = express()

app.use(express.json())

app.use(morgan(':method :host :status :param[id] :res[content-length] - :response-time ms'));

morgan.token('param', function(req, res, param) {
    return req.params[param];
});

const PORT = 3001

app.post("/api/contacts", (request, response) => {
    const contact = request.body;

    if (!body.content) {
        return response.status(400).json({
            error: "Content Missing"
        })
    }

    response.json(contact)
})

app.get("/api/contacts/:id", (request, response) => {
    const id = Number(request.params.id);
    const contact = contacts.find(contact => contact.id === id);

    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/contacts/:id", (request, response) => {
    const id = Number(request.params.id);
    contacts = contacts.filter(contact => contact.id !== id);

    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`)
})