import express from "express";
const router = express.Router();
import { db } from "../index.js"; // Adjust the import based on your structure

router.get("/sort", async (req, res) => {
  let username = req.user.email;
  let result;
  switch (req.query.action) {
    case "button1":
      result = await db.query("SELECT * from books WHERE username = $1 ORDER BY rating DESC", [username]);
      break;
    case "button2":
      result = await db.query("SELECT * from books WHERE username = $1 ORDER BY rating ASC", [username]);
      break;
    case "button3":
      result = await db.query("SELECT * from books WHERE username = $1 ORDER BY date DESC", [username]);
      break;
    case "button4":
      result = await db.query("SELECT * from books WHERE username = $1 ORDER BY date ASC", [username]);
      break;
  }
  res.render("index.ejs", {
    items: result.rows
  });
});

export default router;
