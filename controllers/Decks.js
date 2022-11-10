const { Deck } = require('../models');
const path = require('path');
const fs = require('fs');

class Decks {
  static async getAllDecks(req, res, next) {
    try {
      const allDecks = await Deck.findAll({
        where: {
          UserId: req.user.id
        }
      })
      res.status(200).json({ message: "OK", decks: allDecks })
    } catch (err) {
      next(err)
    }
  }

  static async getDecksDetail(req, res, next) {
    const { id } = req.params
    try {
      const deck = await Deck.findByPk(id)
      res.status(200).json({ message: "OK", detail: deck })
    } catch (err) {
      next(err)
    }
  }

  static async inputDeck(req, res, next) {
    const card = req.body.card
    const name = req.body.name
    try {
      const deck = await Deck.create({
        name: name,
        UserId: req.user.id,
        Cards: card
      })
      res.status(200).json({ message: "Deck Saved", deck: deck })
    } catch (err) {
      next(err)
    }
  }

  static async editDeck(req, res, next) {
    const { id } = req.params
    const name = req.body.name
    const card = req.body.card
    try {
      const deck = await Deck.findByPk(id);
      if (!deck) {
        throw new Error("Deck Not Found")
      }
      await Deck.update({
        Cards: card,
        name: name
      }, {
        where: {
          id: id
        }
      })
      res.status(200).json({ message: "Deck has been edited" })
    } catch (err) {
      next(err);
    }
  }

  static async deleteDeck(req, res, next) {
    const { id } = req.params;
    let deck;
    try {
      deck = await Deck.findByPk(id);
      if (!deck) {
        throw new Error("Deck Not Found");
      } else {
        await Deck.destroy({
          where: {
            id: id
          }
        })
      }
      res.status(200).json({ message: "Deck has been deleted" })
    } catch (err) {
      next(err)
    }
  }

  static async downloadDeck(req, res, next) {
    const { id } = req.params;
    let deck;
    try {
      deck = await Deck.findByPk(id);
      if (!deck) {
        throw new Error("Deck Not Found");
      } else {
        let input = `#created by ...
#main
${deck.Cards.join('\n')}
#extra
!side`
        fs.writeFile('./generated_deck/deck.ydk', input, (err) => {
          if (err) {
            next(err);
          }
          res.download(path.join(__dirname, '..', 'generated_deck', 'deck.ydk'), (err) => {
            if (err) {
              next(err);
            }
            fs.unlink('./generated_deck/deck.ydk', (err) => {
              next(err);
            })
          })
        })
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Decks