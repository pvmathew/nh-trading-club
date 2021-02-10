const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Item = require("../models/Item");

router.post("/", (req, res) => {
  const { itemName, variationName, image, price, token, user } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) console.log(err);
    if (decoded.username !== user) {
      return res.status(400).json({ msg: "Token belongs to another user" });
    }

    const newItem = new Item({
      item: itemName,
      variation: variationName,
      image: image,
      price: price,
      username: user,
    });

    newItem.save().then((item) => {
      res.send(item);
    });
  });
});

router.get("/", async (req, res) => {
  Item.find({}, (err, items) => {
    res.send(items);
  });
});

router.delete("/", async (req, res) => {
  const { itemid, user, token } = req.query;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) console.log(err);
    if (decoded.username !== user) {
      return res.status(400).json({ msg: "Token belongs to another user" });
    }

    Item.findOneAndDelete({ _id: itemid, username: user }, (err, item) => {
      if (err) console.log(err);
      res.send(item.item + " has been successfully deleted!");
    });
  });
});

module.exports = router;
