const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema(
  {
    itemName: { type: String, require: true },
    description: { type: String, require: true },
    locationFound: { type: String, default: "All location" },
    dateFound: { type: Date, default: true },
    claimed: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Item = new mongoose.model("Item", itemSchema);

module.exports = Item;
