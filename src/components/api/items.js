const axios = require("axios");

export const addItem = async (item) => {
  axios
    .post("http://localhost:5000/api/listings", item)
    .then((res) => {
      window.location.reload(false);
    })
    .catch((err) => console.log(err));
};

export const getItems = async (setItems) => {
  axios
    .get("http://localhost:5000/api/listings")
    .then((res) => {
      setItems(res.data.reverse());
    })
    .catch((err) => console.log(err));
};

export const removeItem = async (id, username, token, setResponse) => {
  const URL =
    "http://localhost:5000/api/listings?itemid=" +
    id +
    "&user=" +
    username +
    "&token=" +
    token;

  axios
    .delete(URL)
    .then((res) => {
      window.location.reload(false);
    })
    .catch((err) => console.log(err));
};
