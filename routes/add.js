import express from "express";
const router = express.Router();
import { db,username } from "../index.js"; 
import { coverId,title } from "./book.js";

router.post("/add", async (req, res) => {
  let result = await db.query(`SELECT * FROM books WHERE key=$1 AND username = $2`, [coverId, username]);
  if (result.rows.length == 0) {
    await db.query("INSERT INTO books(key, description, rating, username, title) VALUES ($1, $2, $3, $4, $5)", [coverId, req.body.description, req.body.rating, username,title]);
  }
  res.redirect("/home");
});

export default router;
