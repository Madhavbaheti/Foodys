const mongoose = require("mongoose");


const MongoDB= async ()=> {
   await mongoose.connect('mongodb://foodapp:madhav123@ac-xvtqwh7-shard-00-00.yr2n3sy.mongodb.net:27017,ac-xvtqwh7-shard-00-01.yr2n3sy.mongodb.net:27017,ac-xvtqwh7-shard-00-02.yr2n3sy.mongodb.net:27017/foodys?ssl=true&replicaSet=atlas-yukt1h-shard-0&authSource=admin&retryWrites=true&w=majority')
    .then(() => 
    console.log('Connected Successfully'))
    .catch((err) => { console.error(err); });
    /*const fetch_data = await mongoose.connection.db.collection("food_items");
    var data = await fetch_data.find({}).toArray();
    console.log(data);*/

   
};

module.exports=MongoDB;
