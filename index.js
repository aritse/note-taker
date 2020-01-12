const fs = require("fs");
const util = require("util");
const path = require("path");
const express = require("express");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = path.join(__dirname, "db/db.json");

const notesHTML = path.join(__dirname, "public/notes.html");
const indexHTML = path.join(__dirname, "public/index.html");

app.get("/", (req, res) => res.sendFile(indexHTML));
app.get("/notes", (req, res) => res.sendFile(notesHTML));
app.get("/api/notes", (req, res) => getNotes(res));
app.post("/api/notes", (req, res) => addNote(req.body, res));
app.delete("/api/notes/:id", (req, res) => deleteNote(req.params, res));

async function getNotes(res) {
  try {
    const data = await readFileAsync(db, "utf8");
    const objNotes = JSON.parse(data);
    res.json(objNotes);
  } catch (error) {
    res.send(error);
  }
}

async function addNote(note, res) {
  try {
    const data = await readFileAsync(db, "utf8");
    const objNotes = JSON.parse(data);
    const len = objNotes.length;
    note.id = len > 0 ? objNotes[len - 1].id + 1 : 1;
    objNotes.push(note);
    const strNotes = JSON.stringify(objNotes, null, 2);
    await writeFileAsync(db, strNotes);
    res.json(objNotes);
  } catch (error) {
    res.send(error);
  }
}

async function deleteNote({ id }, res) {
  try {
    const data = await readFileAsync(db, "utf8");
    const objNotes = JSON.parse(data);
    const ids = objNotes.map(note => note.id);
    const deleteIndex = ids.indexOf(parseInt(id));
    if (deleteIndex < 0) {
      res.send("Note not found");
    } else {
      objNotes.splice(deleteIndex, 1);
      const strNotes = JSON.stringify(objNotes, null, 2);
      await writeFileAsync(db, strNotes);
      res.json(objNotes);
    }
  } catch (error) {
    res.send(error);
  }
}

const port = process.env.port || 3000;
app.listen(port, () => console.log("listening on", port));
