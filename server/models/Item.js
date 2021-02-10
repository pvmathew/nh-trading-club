const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const ItemSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
    variation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    register_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

const Item = mongoose.model("item", ItemSchema);
module.exports = Item;
