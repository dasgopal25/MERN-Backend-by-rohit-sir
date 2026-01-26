const express =require("express");
const Auth = require("./middleware/Auth")


const app = express();
const port = 4000;

app.use(express.json());

const foodData = [
  { id: 1, food: "Biryani", category: "non-veg", price: 200 },
  { id: 2, food: "Paneer Butter Masala", category: "veg", price: 180 },
  { id: 3, food: "Chicken Roll", category: "non-veg", price: 120 },
  { id: 4, food: "Veg Fried Rice", category: "veg", price: 150 },
  { id: 5, food: "Mutton Curry", category: "non-veg", price: 250 },
  { id: 6, food: "Dal Tadka", category: "veg", price: 140 },
  { id: 7, food: "Egg Curry", category: "non-veg", price: 160 },
  { id: 8, food: "Aloo Paratha", category: "veg", price: 100 },
  { id: 9, food: "Fish Fry", category: "non-veg", price: 220 },
  { id: 10, food: "Veg Burger", category: "veg", price: 90 },
  { id: 11, food: "Chicken Chowmein", category: "non-veg", price: 170 },
  { id: 12, food: "Veg Pizza", category: "veg", price: 300 },
  { id: 13, food: "Chicken Tikka", category: "non-veg", price: 280 },
  { id: 14, food: "Masala Dosa", category: "veg", price: 110 },
  { id: 15, food: "Butter Chicken", category: "non-veg", price: 260 },
  { id: 16, food: "Veg Momos", category: "veg", price: 80 },
  { id: 17, food: "Chicken Momos", category: "non-veg", price: 100 },
  { id: 18, food: "Rajma Chawal", category: "veg", price: 130 },
  { id: 19, food: "Prawn Curry", category: "non-veg", price: 300 },
  { id: 20, food: "Veg Thali", category: "veg", price: 200 }
];

app.use("/admin",Auth)


app.get("/food",(req,res)=>{
    res.send(foodData);
})

app.post("/admin",(req,res)=>{
         foodData.push(req.body);
       res.send("Successfully added");
});

app.delete("/admin/:id",(req,res)=>{

    const id = parseInt(req.params.id);
    const index = foodData.findIndex(info => info.id === id);

    if(index === -1){
        res.status(404).send("Data doesn't exits");
    }
    foodData.splice(index,1);
    res.status(200).send("Successfully deleted")

});

app.patch("/admin",(req,res)=>{
   const id = req.body.id;
    
   const upFood = foodData.find(info => info.id === id);

     if(req.body.food)
        upFood.food = req.body.food;

     if(req.body.category)
        upFood.category = req.body.category;

     if(req.body.price)
        upFood.price = req.body.price;

     res.status(200).send("successfully updated");
});






app.listen(port,(req,res)=>{
    console.log(`Server listen at port ${port}`);
})