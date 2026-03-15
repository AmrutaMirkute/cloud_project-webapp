const express = require("express")

const app = express()
app.use(express.json())

let transactions = []

app.post("/payment",(req,res)=>{

   const transaction = {
      id: Date.now(),
      amount: req.body.amount,
      status: "success"
   }

   transactions.push(transaction)

   res.json(transaction)

})

app.listen(5000, ()=>{
   console.log("Payment service running on port 5000")
})