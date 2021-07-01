require("./helpers/dbConnection");
const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routers/userRouter.js");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use((err, req, res, next) => {
  res.status(500).json({ msg: err });
});
const root = require("path").join(__dirname, "client", "build");
app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
