const express = require("express")
const fetch = require("node-fetch")

const app = express()
app.use(express.json())

app.post("/processPayment", async (req,res)=>{

   const response = await fetch("http:10.0.3.94//:5000/payment",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify(req.body)
   })

   const data = await response.json()

   res.json(data)

})

app.listen(4000, ()=>{
   console.log("API Service running on port 4000")
})