const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");

const MongoDB = async () => {
  await mongoose.connect("mongodb://foodapp:madhav123@ac-xvtqwh7-shard-00-00.yr2n3sy.mongodb.net:27017,ac-xvtqwh7-shard-00-01.yr2n3sy.mongodb.net:27017,ac-xvtqwh7-shard-00-02.yr2n3sy.mongodb.net:27017/foodys?ssl=true&replicaSet=atlas-yukt1h-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log("Connected Successfully"))
  .catch((err) => {
    console.error(err);
    });

  const fetch_data =  await mongoose.connection.db.collection('food_items');
  const data = await fetch_data.find({}).toArray()
  const fetch_CategoryData = await mongoose.connection.db.collection('category');
  const CategoryData = await fetch_CategoryData.find({}).toArray()
   
   global.category = CategoryData;
   global.food_items = data;
   console.log(global.category);
   console.log(global.food_items);
   


};
MongoDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With ,Content-Type ,Accept"
  );
  next();
});
app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/*const fetch_data = await mongoose.connection.db.collection("food_items");
var data = await fetch_data.find({}).toArray();
console.log(data);*/
