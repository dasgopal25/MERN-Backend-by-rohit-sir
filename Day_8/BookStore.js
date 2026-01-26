const express = require("express");
 const app = express();
const port = 4000;

let bookStore = [
  { id: 1, name: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, name: "Atomic Habits", author: "James Clear" },
  { id: 3, name: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
  { id: 4, name: "Think and Grow Rich", author: "Napoleon Hill" },
  { id: 5, name: "love story", author: "Charles Duhigg" },
  { id: 6, name: "The Power of Habit", author: "Charles Duhigg" }

];

app.use(express.json());

app.get("/book",(req,res)=>{
    // res.send(bookStore);
    // console.log(bookStore);
    console.log(req.query);
    const book = bookStore.filter(info =>info.author === req.query.author);
    res.send(book);
})

app.get("/book/:id",(req,res)=>{
    // console.log(typeof(parseInt(req.params.id)));
    const id = parseInt(req.params.id);
    const Book = bookStore.find(info=> info.id ===id);
      console.log(Book);
      
    res.send(Book); 
})

app.post("/book",(req,res)=>{
    bookStore.push(req.body);
    res.send("Data Save Successfully");
});

app.delete("/book/:id", (req, res) => {
    const id = parseInt(req.params.id);
//using findIndex And splice
const index = bookStore.findIndex((info)=>info.id ===id);

 bookStore.splice(index,1);

//using filter 
    // bookStore = bookStore.filter(info => info.id !== id)

    // console.log(bookStore);
    
     res.send("done")
});






app.patch("/book",(req,res)=>{
    const Book = bookStore.find(info =>info.id===req.body.id);

    if(req.body.name)
    Book.name = req.body.name;

    if(req.body.author)
    Book.author = req.body.author;

    res.send("patch has been done");
}); 


app.listen(port,()=>{
    console.log(`Server listen at ${port}`)
});
