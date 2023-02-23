const express = require("express");

const app = express();
app.use(express.json());

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  const line1 = `Phonebook has info for ${phonebook.length} people`;
  const line2 = new Date().toString();
  response.send(`<p>${line1}</p><p>${line2}</p>`);
});

app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons/", (request, response) => {
  const body = request.body;

  const newPerson = {
    id: Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number,
  };

  phonebook = phonebook.concat(newPerson);

  response.json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((p) => p.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
