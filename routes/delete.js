import express from "express";
const router = express.Router();
import { db } from "../index.js"; // Adjust the import based on your structure

router.get("/delete", async (req, res) => {
  let { key } = req.query;
  let username = req.user.email;
  await db.query(`DELETE FROM books WHERE key = $1 AND username = $2`, [key, username]);
  res.redirect("/home");
});

export default router;
