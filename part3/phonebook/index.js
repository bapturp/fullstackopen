require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Number = require("./models/number");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (req, res) => {
  Number.find({}).then((numbers) => res.json(numbers));
});

app.get("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);

  const person = people.find((person) => person.id === personId);

  if (person) {
    return res.json(person);
  } else {
    return res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  const date = new Date(Date.now());

  Number.find({}).then((numbers) => {
    let html = `
    <p>Phonebook has info for ${numbers.length} people<p>
    <p>${date.toString()}</p>
    `;
    return res.send(html);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);

  people = people.filter((person) => person.id !== personId);

  return res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  if (!req.body?.name || !req.body?.number || req.body === undefined) {
    return res.status(400).json({ error: "Content missing" });
  }
  const { name, number } = req.body;

  const newNumber = new Number({
    name,
    number,
  });

  // if (people.find((p) => p.name === name)) {
  //   return res.status(400).json({ error: "Name must be unique" });
  // }

  newNumber.save().then((savedNumber) => res.json(savedNumber));
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server nunning on port ${PORT}`));
