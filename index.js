import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import fs from "fs";
import env from "dotenv";
import passport from "passport";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth2";



// Import routes
import loginRoute from "./routes/login.js";
import homeRoute from "./routes/home.js";
import bookRoute from "./routes/book.js";
import addRoute from "./routes/add.js";
import deleteRoute from "./routes/delete.js";
import feedRoute from "./routes/feed.js";
import sortFeedRoute from "./routes/sortFeed.js";
import sortRoute from "./routes/sort.js";
import aiRoute from "./routes/ai.js"

const app = express();
const port = process.env.port || 4000;
env.config();

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
});

db.connect();

let username = '';
let displayName='';

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

// Use routes
app.use("/", loginRoute);
app.use("/", homeRoute);
app.use("/", bookRoute);
app.use("/", addRoute);
app.use("/", deleteRoute);
app.use("/", feedRoute);
app.use("/", sortFeedRoute);
app.use("/", sortRoute);
app.use("/",aiRoute);



let url = '';
if (port == 3000) {
  url = "http://localhost:3000/auth/google/home";
} else {
  url = "https://library-hr83.onrender.com/auth/google/home";
}

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: url,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        username = profile.email;
        let name = profile.name.givenName
        if(profile.name.familyName){
          name+=' '
          name+=profile.name.familyName
        }
        displayName=name
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *",
            [profile.email, "google",name]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`The app is live on port ${port}`);
});

export {db,username,displayName}