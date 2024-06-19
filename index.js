import express from "express";
import bodyParser from "body-parser";



const app = express()
const port = 3000


let title =''
let author=''
let coverId=''

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs")
})




app.get("/book", async (req,res)=>{
  title = req.query.title;
  author = req.query.author;
  coverId = req.query.coverId;
  // console.log(title,author,coverId)
  res.render("addBook.ejs",{
    key:coverId
  })
})

app.post("/add",(req,res)=>{
  console.log(req.body)
  res.send("form received")
})

app.listen(port,()=>{
    console.log(`The app is live on port ${port}`)
})