import express from "express";
import bodyParser from "body-parser";
import pg from "pg"
import fs from "fs"


const app = express()
const port = process.env.PORT || 4000;

//used postgres on aiven.io
const db = new pg.Client({
  user:"avnadmin",
  password:"AVNS_dAHsElgzjKBbCj-T98K",
  host:"pg-13973974-bookmark.j.aivencloud.com",
  port:17196,
  database:"defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
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
  if(result.rows.length==0){
    await db.query("INSERT INTO books(key, description, rating) VALUES ($1, $2, $3)",[coverId,req.body.description,req.body.rating]);
  }
  res.redirect("/")
})

app.get("/delete",async (req,res)=>{
  // console.log(req.query)
  await db.query(`DELETE FROM books WHERE key = ${req.query.key}`)
  res.redirect("/")
})

app.get("/sort", async(req,res)=>{
  // console.log(req.query)
  let result
  switch(req.query.action) {
    case "button1":
      result = await db.query("SELECT * from books ORDER BY rating DESC")
      break;
    case "button2":
      result = await db.query("SELECT * from books ORDER BY rating ASC")
      break;
    case "button3":
      result = await db.query("SELECT * from books ORDER BY date DESC")
      break;
    case "button4":
      result = await db.query("SELECT * from books ORDER BY date ASC")
      break;
  } 
  res.render("index.ejs",{
    items:result.rows
  })
})

app.listen(port,()=>{
    console.log(`The app is live on port ${port}`)
})