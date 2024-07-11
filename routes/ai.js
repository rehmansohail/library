import axios from "axios";
import {db, username,displayName } from "../index.js";
import express, { response } from "express";

const router = express.Router();

router.get("/ai",async (req,res)=>{
    let result = await db.query("SELECT title FROM books WHERE username = $1;",[username])
    let query =''
    for(let i=0;i<result.rows.length;i++){
      query+=result.rows[i].title
      if(i!= result.rows.length-1)query+=', '
    }
  
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/chat",
      headers: {
        authorization: process.env.ai_api_key,
      },
      data: {
        providers: "openai",
        text: query,
        chatbot_global_action: "Recommend some books based on what are already in my collection",
        previous_history: [],
        temperature: 0.0,
        max_tokens: 150,
      },
    };
    
    axios
  .request(options)
  .then((response) => {
    let response_query = response.data.openai.generated_text;
    res.render("ai.ejs", {
      username: displayName,
      response: response_query,
    });
  })
  .catch((error) => {
    console.error(error);
    res.render("ai.ejs",{
        username:displayName,
        response:"error fetching results from the AI api"
    })
  });

  
  
  })
  


export default router