import express from "express";
import bodyParser from "body-parser";
import pg from "pg"
import fs from "fs"
import env from "dotenv";
import passport from "passport";
import session from "express-session";
import GoogleStratergy from "passport-google-oauth2";


const app = express()
const port = process.env.port || 4000;
env.config()

//used postgres on aiven.io
const db = new pg.Client({
  user: process.env.pg_user,
  password: process.env.pg_password,
  host: process.env.pg_host,
  port: process.env.pg_port,
  database: process.env.pg_db,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
})

db.connect()

let title=''
let author=''
let coverId=''
let username=''

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req,res)=>{
    res.render("login.ejs")
})

app.get("/home", async(req, res) => {
  // console.log(req.user);
  if (req.isAuthenticated()) {
    let result = await db.query("SELECT * from books WHERE username =$1",[username])
    let books = result.rows
    // console.log(books)
    res.render("index.ejs",{
      items:books
    })
  } else {
    res.redirect("/");
  }
});

app.get("/auth/google",passport.authenticate("google",{
  scope:["profile","email"],
}))

app.get("/auth/google/home", passport.authenticate("google",{
  successRedirect:"/home",
  failureRedirect:"/"
}))

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

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
  let result = await db.query(`SELECT * FROM books WHERE key=$1 AND username = $2`,[coverId,username])
  if(result.rows.length==0){
    await db.query("INSERT INTO books(key, description, rating,username) VALUES ($1, $2, $3,$4)",[coverId,req.body.description,req.body.rating,username]);
  }
  res.redirect("/home")
})

app.get("/delete",async (req,res)=>{
  // console.log(req.query)
  await db.query(`DELETE FROM books WHERE key = $1 AND username = $2`,[req.query.key,username])
  res.redirect("/home")
})

app.get("/sort", async(req,res)=>{
  // console.log(req.query)
  let result
  switch(req.query.action) {
    case "button1":
      result = await db.query("SELECT * from books WHERE username = $1 ORDER BY rating DESC",[username])
      break;
    case "button2":
      result = await db.query("SELECT * from books WHERE username = $1 ORDER BY rating ASC",[username])
      break;
    case "button3":
      result = await db.query("SELECT * from books WHERE username = $1 ORDER BY date DESC",[username])
      break;
    case "button4":
      result = await db.query("SELECT * from books WHERE username = $1 ORDER BY date ASC",[username])
      break;
  } 
  res.render("index.ejs",{
    items:result.rows
  })
})

let url=''
if(port ==3000){
  url = "http://localhost:3000/auth/google/home"
}else{
  url = "https://library-hr83.onrender.com/auth/google/home"
}


passport.use("google", new GoogleStratergy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: url,
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
},
async(accessToken, refreshToken,profile,cb)=>{
try {
  username=profile.email
  // console.log(username)
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    profile.email,
  ]);
  if (result.rows.length === 0) {
    const newUser = await db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [profile.email, "google"]
    );
    return cb(null, newUser.rows[0]);
  } else {
    return cb(null, result.rows[0]);
  }
} catch (err) {
  return cb(err);
}
}
))



passport.serializeUser((user, cb) => {
cb(null, user);
});
passport.deserializeUser((user, cb) => {
cb(null, user);
});


app.listen(port,()=>{
    console.log(`The app is live on port ${port}`)
})