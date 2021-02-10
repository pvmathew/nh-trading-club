const axios = require("axios");

export const registerUser = (newUser) => {
  axios
    .post("http://localhost:5000/api/user/register", newUser)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const loginUser = (user, setUser, setToken) => {
  axios
    .post("http://localhost:5000/api/user/login", user)
    .then((res) => {
      const { token, username } = res.data;
      setUser(username);
      setToken(token);
      window.location.reload(false);
    })
    .catch((err) => console.log(err));
};
