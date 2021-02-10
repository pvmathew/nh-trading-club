const axios = require("axios");

export const getProfile = async (username, setUserListings) => {
  axios
    .get("http://localhost:5000/api/profile?username=" + username)
    .then((res) => {
      let listings = res.data;
      setUserListings(listings);
    })
    .catch((err) => console.log(err));
};
