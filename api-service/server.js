/*
const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()
app.use(express.json())
app.use(cors())

//CALL PAYMENT SERVICE 

app.post("/pay", async (req,res)=>{

  try{

    const response = await axios.post(
      "http://10.0.3.94:5000/payment",
      req.body
    )

    res.json(response.data)

  }catch(err){

    res.status(500).send(err.message)

  }

})

// GET TRANSACTIONS 

app.get("/transactions/:account_id", async (req,res)=>{

  try{

    const response = await axios.get(
      `http://10.0.3.94:5000/transactions/${req.params.account_id}`
    )

    res.json(response.data)

  }catch(err){

    res.status(500).send(err.message)

  }

})

app.listen(4000,()=>{
  console.log("API Service running on port 4000")
})
*/
const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()

app.use(express.json())
app.use(cors())

/* CALL PAYMENT SERVICE */

app.post("/pay", async (req,res)=>{

try{

const response = await axios.post(
"http://10.0.3.94:5000/payment",
req.body
)

res.json(response.data)

}catch(err){

res.status(500).send(err.message)

}

})

/* GET TRANSACTIONS */

app.get("/transactions/:account_id", async (req,res)=>{

try{

const response = await axios.get(
`http://10.0.3.94:5000/transactions/${req.params.account_id}`
)

res.json(response.data)

}catch(err){

res.status(500).send(err.message)

}

})

app.listen(4000,()=>{
console.log("API Service running on port 4000")
})