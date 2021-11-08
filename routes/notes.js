const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

// GET Route for a specific note
notes.get('/:id', (req, res) => {
  console.info(`${req.method} request received to get a single a review`, req.params.id);
  const idForNote = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((notes) => notes.id === idForNote);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received to get a single a review`, req.params.id);

  const idForNote = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((notes) => notes.id !== idForNote);
      // Save that array to the filesystem
      writeToFile('./db/db.json', result);
      // Respond to the DELETE request
      res.json(`Item ${idForNote} has been deleted 🗑️`);
    });
});

module.exports = notes;
