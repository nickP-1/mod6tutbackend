const express = require("express");
var cors = require("cors");
const app = express();
const router = express.Router();
const Song = require("./models/songs");

app.use(cors());
app.use(express.json());

router.get("/songs", async function (req, res) {
  let query = {};

  if (req.query.genre) {
    query = { genre: req.query.genre };
  }
  try {
    const songs = await Song.find(query);
    res.json(songs);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/songs", async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
    console.log(song);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/songs/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    res.json(song);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/songs/:id", async (req, res) => {

  try {
    const song = req.body;
    await Song.updateOne({ _id: req.params.id }, song);
    console.log(song);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/songs/:id", async function (req, res) {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);

    if (!deletedSong) {
      return res.status(404).send("Song not found.");
    }

    res.json({ message: "Song succesfully deleted", song: deletedSong });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.use("/api", router);
app.listen(3000, () => {
  console.log("App is listening on port 3000");
});