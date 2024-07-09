import express from "express";
const router = express.Router();
import { db,displayName, username } from "../index.js"; // Adjust the import based on your structure

router.get("/feed", async (req, res) => {
  let result = await db.query("SELECT key, ROUND(AVG(rating)) AS average_rating FROM books GROUP BY key;");
  let books = result.rows;
  res.render("feed.ejs", {
    items: books,
    username:displayName
  });
});

export default router;
