const express = require("express");

const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    res.send([global.food_items,global.category]);
  } catch (error) {
    console.error(error.message);
    res.send("Servor error");
  }
});

module.exports = router;
