const axios = require("axios");

const fetchHttpData = async () => {
  try {
    const response = await axios.getAdapter(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

const loginPostSend = (user) => {};
