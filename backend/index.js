//connect to mongodb with index
const ConnectToMongo = require("./db");
const express = require("express");
var cors = require('cors')
//connect mongo method.
ConnectToMongo();

const app = express();
const port = 5000;
//import express then use to json data
app.use(express.json());

app.use(cors());

//Available Router
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/notes", require("./Routes/notes"));

app.listen(port, () => {
  console.log(`INotebook Backend listening on http://localhost:${port}`);
});
