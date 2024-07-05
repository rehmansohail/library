import express from "express";
const router = express.Router();
import { db } from "../index.js"; // Adjust the import based on your structure

router.get("/",(req,res)=>{
    res.render("login.ejs")
})

router.get("/home", async (req, res) => {
  if (req.isAuthenticated()) {
    let result = await db.query("SELECT * from books WHERE username =$1", [req.user.email]);
    let books = result.rows;
    res.render("index.ejs", {
      items: books
    });
  } else {
    res.redirect("/");
  }
});

export default router;
