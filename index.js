const express = require("express");
const mongoose = require("mongoose");
const Item = require("./itemModel");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

const MONGODB_URL =
  "mongodb+srv://user_new_200:demSEY21@cluster0.gaqwx6m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Mongodb is connected");
    app.listen(PORT, () => {
      console.log(`Server started running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/all-item", async (req, res) => {
  const allItem = await Item.find();

  res.status(200).json({
    message: "Success",
    allItem,
  });
});

app.post("/create-item", async (req, res) => {
  const { itemName, description, locationFound, dateFound, claimed } = req.body;

  const newItem = new Item({
    itemName,
    description,
    locationFound,
    dateFound,
    claimed,
  });
  await newItem.save();

  res.status(201).json({
    message: "Success",
    newItem,
  });
});

app.get("/unclaimed-item", async (req, res) => {
  const { claimed } = req.body;
  // console.log(claimed);
  const unclaimed = await Item.find();

  const findUnclaimed = unclaimed.filter(
    (unclaimed) => unclaimed.claimed === claimed
  );
  return res.status(200).json({
    message: "Success",
    findUnclaimed,
  });
});

app.get("/one-item/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);

  if (!item) {
    return res.status(404).json({ message: "item not found" });
  }

  res.status(200).json({
    message: "Success",
    item,
  });
});

app.patch("/item-details/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const { claimed } = req.body;

  const existingItem = await Item.findById(id);

  if (existingItem) {
    existingItem.description = description;
    existingItem.claimed = claimed;

    await existingItem.save();

    return res.status(200).json({
      message: "Success",
      existingItem,
    });
  } else {
    res.status(404).json({
      message: "name does not exist",
    });
  }
});

app.delete("/delete-item", async (req, res) => {
  const { id } = req.body;
  const deleteItem = await Product.findByIdAndDelete(id);
  res.status(200).json({
    message: "Success",
  });
});
