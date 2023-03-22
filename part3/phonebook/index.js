require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const Person = require("./models/person");

// Error handler middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

// Unknown endpoint middleware
const unknownEndpoint = (req, res) =>
  res.status(404).send({ error: "unknown endpoint" });

// cors allows client (frontend) to send request to other server than source server
// i.e. frontend is loaded from server:3000 while the API is server:3001
app.use(cors());

// json-parser: parse POST data to json
app.use(express.json());

// morgan is a http request logger middleware
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// serve static files from build directory - these file are checked first on each request
app.use(express.static("build"));

// ------ ROUTES ------
//
// GET /info
app.get("/info", (req, res) => {
  const date = new Date(Date.now());

  Person.find({}).then((persons) => {
    let html = `
    <p>Phonebook has info for ${persons.length} people<p>
    <p>${date.toString()}</p>
    `;
    return res.send(html);
  });
});

// GET /api/persons
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

// GET /api/persons/:id
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// PUT /api/persons/:id
app.put("/api/persons/:id", (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        return res.json(updatedPerson);
      } else {
        return res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// POST /api/persons
app.post("/api/persons", (req, res, next) => {
  if (!req.body?.name || !req.body?.number || req.body === undefined) {
    return res.status(400).json({ error: "Content missing" });
  }
  const { name, number } = req.body;

  const newPerson = new Person({
    name,
    number,
  });

  newPerson
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));
});

// DELETE /api/persons/:id
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server nunning on port ${PORT}`));
