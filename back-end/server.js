const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images',
  limits: {
    fileSize: 10000000
  }
});

const mongoose = require('mongoose');


const pieceSchema = new mongoose.Schema({
  name: String,
  moves: [{x: Number, y: Number}],
  image: String
});

// Create a model for items in the museum.
const Piece = mongoose.model('Piece', pieceSchema);

// connect to the database
mongoose.connect('mongodb://localhost:27017/rChess', {
  useNewUrlParser: true
});

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: req.file.filename
  });
});

app.post('/api/pieces', async (req, res) => {
  const piece = new Piece({
    name: req.body.name,
    moves: req.body.moves,
    image: "/images/" + req.body.image,
  });
  try {
    await piece.save();
    res.send(piece);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/pieces', async (req, res) => {
  try {
    let pieces = await Piece.find();
    res.send(pieces);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/pieces/:id', async (req, res) => {
  let piece = await Piece.findOne({
    _id: req.params.id
  })
  piece.moves = req.body.moves;
  try {
    await piece.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});




app.listen(3000, () => console.log('Server listening on port 3000!'));
