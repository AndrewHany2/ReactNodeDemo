require("./helpers/dbConnection");
const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routers/userRouter.js");
var cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: err });
});
const path = require("path");
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
