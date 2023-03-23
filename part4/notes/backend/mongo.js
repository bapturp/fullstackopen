require('dotenv').config();
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://yo7AgqB4KMEo9TmHP4Wb:${password}@cluster1.xx6kbup.mongodb.net/notes?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

let notes = [
  {
    content: 'HTML is easy',
    important: true,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

for (let i = 0; i < notes.length; i++) {
  const note = new Note({
    content: notes[i].content,
    date: new Date(),
    important: notes[i].important,
  });

  Note.create(note).then((message) => console.log(message));
}

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
