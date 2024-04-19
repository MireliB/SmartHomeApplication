const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
// git clone https://github.com/CIRCLECI-GWP/making-http-requests-axios

axios
  .get("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const coreOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(coreOptions));
app.use("/", router);

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
