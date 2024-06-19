import express from "express";
import bodyParser from "body-parser";


const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.get("/book", async (req,res)=>{
  const title = req.query.title;
  const author = req.query.author;
  const coverId = req.query.coverId;
  console.log(title,author,coverId)
})


app.listen(port,()=>{
    console.log(`The app is live on port ${port}`)
})