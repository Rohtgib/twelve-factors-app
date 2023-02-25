require("dotenv").config();
const mongooseClient = require("mongoose");

const NotesSchema = mongooseClient.Schema({
    title: String,
    description: String,
  });

const fs = require('fs');
const rawData = fs.readFileSync('notes.json');
const data = JSON.parse(rawData);

const Notes = mongooseClient.model("Notes", NotesSchema);

mongooseClient.connect(
  process.env.DATABASE_PATH,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
  }
);

Notes.insertMany(data, function(err) {
  if (err) console.error(err);
  else console.log('Notes added');
});