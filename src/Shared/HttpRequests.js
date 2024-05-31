import axios from "axios";

const fetchHttpData = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

const loginSendPost = (user) => {};

export { fetchHttpData };
export { loginSendPost };
