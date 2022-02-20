const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

const tasksRouter = require("./routes/tasks");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT"
  );

  next();
});

app.use(bodyParser.json());

app.use("/api/tasks", tasksRouter);

app.listen(port, () => {
  console.log("Server is listening in port", port, "\n");
});

app.on("error", () => {
  console.log(" error running server ");
});
