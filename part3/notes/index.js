const express = require("express");
const { generateId } = require("./utils");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const requestLogger = (req, res, next) => {
  const { method, path, body } = req;
  console.log(`Method: ${method}`);
  console.log(`Path: ${path}`);
  console.log(`Body : ${JSON.stringify(body)}`);
  console.log("---");
  next();
};

app.use(requestLogger);

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only Javascript", important: false },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => res.json(notes));

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    // since no data is attached to the res, we use status and the end method.
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  // if the resource doesn't exist we can send 204 or 404
  // for the sake of simplicity we send 204
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const body = req.body;

  // checking if the request has proper keys
  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = {
    content: body.content,
    importtant: body.important || false,
    id: generateId(notes),
  };

  notes = notes.concat(note);

  res.json(note);
});

const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Server running: http://localhost:${PORT}/`)
);
