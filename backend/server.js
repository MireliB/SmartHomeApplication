const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

// doesnt work need to check why

app.get("/api", (req, res) => {
  res.send("From server");
});

//works!
app.use(bodyParser.json());

app.post("/api/login", (req, res) => {
  let { email, password } = req.body;
  if (email === "admin" && password === "password") {
    console.log("Succeed");
  } else {
    console.log("Not a valid user");
  }
  res.json({ message: "Form Submitted" });
});

app.use(bodyParser.urlencoded({ extended: false }));

const coreOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(coreOptions));
app.use("/", router);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
