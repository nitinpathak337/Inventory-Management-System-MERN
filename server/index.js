//creating server using express and connecting it to mongoDB database

const express = require("express");

const cors = require("cors");
const mongodb = require("mongodb")
const { MongoClient } = require("mongodb");
// const path = require("path");



const port = process.env.port || 5000;

// const port=5000;


const database = "ims-app-db";

//connection string to connect to the database
const url ="mongodb+srv://nitinpathak337:CSrF7mCyj92vZktD@cluster0.idctahp.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(url);
const app = express();
app.use(express.json());
app.use(cors());

let result = null;
let db = null;
let collection = null;

//connecting to database
async function connectDB() {
  try {
    result = await client.connect();

    db = result.db(database);

    collection = db.collection("inventory-collection");

    console.log("Database Connected ");
  } catch (err) {
    console.log(`DB Error : ${err}`);
  }
}




//api to get all items
app.get("/inventory", async (req, res) => {
  try{
  response = await collection.find({}).toArray();

  res.send(response);
  }
  catch(err){
    console.log(err);
  }
});

//api to get single item
app.get("/inventory/:id", async (req, res) => {
  const {id}=req.params;
  response = await collection.find({_id:new mongodb.ObjectId(id)}).toArray();

  res.send(response);
});

//api to add item

app.post("/inventory", async (req, res) => {
  const { name, category, quantity,price } = req.body;
  await collection.insertOne({
    name: name,
    category: category,
    quantity: quantity,
    price:price
  });
  res.status(200);
  res.send("Item Added Successfully");
});

//api to update item
app.put("/inventory/:id",async(req,res)=>{
  const { name, category, quantity,price } = req.body;
  const {id}=req.params; 
  await collection.updateOne({_id:new mongodb.ObjectId(id)},{$set:{name:name,category:category,quantity:quantity,price:price}});
  res.status(200);
  res.send("Item Updated Successfully");
})




//api to delete item

app.delete("/inventory/:id", async (req, res) => {
  const { id } = req.params;
  
  
  await collection.deleteOne({_id:new mongodb.ObjectId(id)})
  res.status(200);
  res.send("Item Deleted Successfully");
});



const server=app.listen(port, async() => {
  console.log("Server Started");
   connectDB();
});



