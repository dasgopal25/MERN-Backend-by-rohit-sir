const express =require("express");
const Auth = require("./middleware/Auth")
const path = require("path")
const fs = require("fs");

const DATASAVE = path.join(__dirname,'name.json');

const app = express();
const port = 4000;

if(!fs.existsSync(DATASAVE)){
    fs.writeFileSync(DATASAVE,JSON.stringify([]))
}

app.use(express.json());

// const foodData = [
//   { id: 1, food: "Biryani", category: "non-veg", price: 200 },
//   { id: 2, food: "Paneer Butter Masala", category: "veg", price: 180 },
//   { id: 3, food: "Chicken Roll", category: "non-veg", price: 120 },
//   { id: 4, food: "Veg Fried Rice", category: "veg", price: 150 },
//   { id: 5, food: "Mutton Curry", category: "non-veg", price: 250 },
//   { id: 6, food: "Dal Tadka", category: "veg", price: 140 },
//   { id: 7, food: "Egg Curry", category: "non-veg", price: 160 },
//   { id: 8, food: "Aloo Paratha", category: "veg", price: 100 },
//   { id: 9, food: "Fish Fry", category: "non-veg", price: 220 },
//   { id: 10, food: "Veg Burger", category: "veg", price: 90 },
//   { id: 11, food: "Chicken Chowmein", category: "non-veg", price: 170 },
//   { id: 12, food: "Veg Pizza", category: "veg", price: 300 },
//   { id: 13, food: "Chicken Tikka", category: "non-veg", price: 280 },
//   { id: 14, food: "Masala Dosa", category: "veg", price: 110 },
//   { id: 15, food: "Butter Chicken", category: "non-veg", price: 260 },
//   { id: 16, food: "Veg Momos", category: "veg", price: 80 },
//   { id: 17, food: "Chicken Momos", category: "non-veg", price: 100 },
//   { id: 18, food: "Rajma Chawal", category: "veg", price: 130 },
//   { id: 19, food: "Prawn Curry", category: "non-veg", price: 300 },
//   { id: 20, food: "Veg Thali", category: "veg", price: 200 }
// ];
function readName(){
    const data = fs.readFileSync(DATASAVE,'utf8');
    return JSON.parse(data);
}

function writeName(data){
    fs.writeFileSync(DATASAVE,JSON.stringify(data,null,2));
    return (data);
}


const addcard =[];

// app.use("/admin",Auth)

app.get("/user",(req,res)=>{
    res.send(addcard);
})
app.post("/user/:id",(req,res)=>{
     
    const id = parseInt(req.params.id);
   
    const item = foodData.find(info=>info.id===id);
    console.log(item);
    if(item){
         addcard.push(item);
    res.send("item add successfully");
    }else{
        res.send("item doesn't exits");
    }
   

});
app.delete("/user/:id",(req,res)=>{
     const id = parseInt(req.params.id);
   
    const index = addcard.findIndex(info=>info.id===id);
     console.log(index);
     if (index!==-1) {
         addcard.splice(index,1);
         res.send("selected item has been deleted");
     } else {
        res.send("invalid item");
     }
    

})

app.get("/food",(req,res)=>{
    res.send(foodData);
})




app.post("/admin", (req, res) => {
    try {
        const { id, food, category, price } = req.body;

        if (!id || !food || !category || !price) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const data = readName();
        data.push({ id, food, category, price });
        writeName(data);

        res.status(201).json({
            msg: "Data saved successfully"
        });

    } catch (err) {
        console.log("Err:", err);
        res.status(500).json({ msg: "Server Error" });
    }
});


app.delete("/admin/:id",(req,res)=>{ 

    const id = parseInt(req.params.id);
     const data = readName();

        const index = data.findIndex(item => item.id == id);

    // const index = foodData.findIndex(info => info.id === id);
    if(index === -1){
        res.status(404).send("Data doesn't exits");
    }
     data.splice(index, 1);
        writeName(data);

    // foodData.splice(index,1);
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
});