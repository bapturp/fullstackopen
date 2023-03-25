const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app); // returns a superagent object

const Note = require('../models/note');

beforeEach(async () => {
  await Note.deleteMany({});

  const noteObjects = helper.initialNotes.map((note) => new Note(note));
  const promiseArray = noteObjects.map((note) => note.save());
  await Promise.all(promiseArray);

  // for (const note of helper.initialNotes) {
  //   const newNote = new Note(note);
  //   await newNote.save();
  // }
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200) // response code should be 200
    .expect('Content-Type', /application\/json/); // response header should match regexp
});

test('there are two notes', async () => {
  const response = await api.get('/api/notes');

  expect(response.body).toHaveLength(2);
});

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes/');

  expect(response.body[0].content).toBe('HTML is easy');
});

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const noteAtEnd = await helper.notesInDb();
  expect(noteAtEnd).toHaveLength(helper.initialNotes.length + 1);

  const contents = noteAtEnd.map((n) => n.content);

  expect(contents).toContain('async/await simplifies making async calls');
});

test('note without content is not added', async () => {
  const newNote = { important: true };

  await api.post('/api/notes').send(newNote).expect(400);

  const response = await api.get('/api/notes');

  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test('a specific note can be viewed', async () => {
  const noteAtStart = await helper.notesInDb();

  const noteToView = noteAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultNote.body).toEqual(noteToView);
});

test('a note can be deleted', async () => {
  const noteAtStart = await helper.notesInDb();
  const noteToDelete = noteAtStart[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const notesAtEnd = await helper.notesInDb();

  const contents = notesAtEnd.map((r) => r.content);

  expect(contents).not.toContain(noteToDelete.content);
});

afterAll(async () => await mongoose.connection.close());
