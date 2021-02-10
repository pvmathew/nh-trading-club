const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Item = require("../models/Item");

router.get("/", (req, res) => {
  const { username } = req.query;

  Item.find({ username }, (err, items) => {
    res.send(items);
  });

  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //   if (err) console.log(err);
  //   if (decoded.username !== user) {
  //     return res.status(400).json({ msg: "Token belongs to another user" });
  //   }

  //   const newItem = new Item({
  //     item: itemName,
  //     variation: variationName,
  //     image: image,
  //     price: price,
  //     username: user,
  //   });

  //   newItem.save().then((item) => {
  //     res.send(item);
  //   });
  // });
});

module.exports = router;
