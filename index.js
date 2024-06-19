import express from "express";
import bodyParser from "body-parser";
import pg from "pg"


const app = express()
const port = 3000

const db = new pg.Client({
  user:"postgres",
  password:"Teacher@123",
  host:"172.21.0.1",
  port:5432,
  database:"library"
})

db.connect()

let title=''
let author=''
let coverId=''

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",async (req,res)=>{
    let result = await db.query("SELECT * from books")
    let books = result.rows
    // console.log(books)
    res.render("index.ejs",{
      items:books
    })
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

app.post("/add",async (req,res)=>{
  // console.log(req.body)
  let result = await db.query(`SELECT * FROM books WHERE key=${coverId}`)
  if(result.rows.length==0)await db.query(`INSERT INTO books(key,description,rating) VALUES (${coverId},'${req.body.description}',${req.body.rating})`)
  res.redirect("/")
})

app.get("/delete",async (req,res)=>{
  // console.log(req.query)
  await db.query(`DELETE FROM books WHERE key = ${req.query.key}`)
  res.redirect("/")
})

app.listen(port,()=>{
    console.log(`The app is live on port ${port}`)
})