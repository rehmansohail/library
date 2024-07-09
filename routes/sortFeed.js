import express from "express";
const router = express.Router();
import { db,displayName, username } from "../index.js"; // Adjust the import based on your structure

router.get("/sortFeed", async (req, res) => {
  let result;
  switch (req.query.action) {
    case "button1":
      result = await db.query("SELECT key, ROUND(AVG(rating)) AS average_rating FROM books GROUP BY key ORDER BY average_rating DESC;");
      break;
    case "button2":
      result = await db.query("SELECT key, ROUND(AVG(rating)) AS average_rating FROM books GROUP BY key ORDER BY average_rating ASC;");
      break;
  }
  res.render("feed.ejs", {
    items: result.rows,
    username:displayName
  });
});

export default router;
