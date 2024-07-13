import express from "express";
const router = express.Router();
import { displayName, username } from "../index.js";

let title=''
let coverId=''

router.get("/book", async (req, res) => {
    title = req.query.title;
    coverId = req.query.coverId;
  res.render("addBook.ejs", {
    key: coverId,
    username:displayName
  });
});

export default router;
export {coverId,title}
