const express = require('express');
const Decks = require('../controllers/Decks');
const Authorization = require('../middleware/authorization');
const decks = express.Router();

decks.get('/', Decks.getAllDecks);
decks.post('/', Decks.inputDeck);
decks.get('/download/:id', Decks.downloadDeck);
decks.get('/:id', Decks.getDecksDetail);
decks.put('/:id', Decks.editDeck);
decks.delete('/:id', Authorization.deleteAuthorization, Decks.deleteDeck);


module.exports = decks;