
/*
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let transactions = [];

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if(email === "user@test.com" && password === "123456"){
        res.json({message: "Login successful"});
    } else {
        res.status(401).json({message: "Invalid credentials"});
    }
});

app.post("/payment", (req, res) => {
    const { amount, description } = req.body;

    const transaction = {
        id: Date.now(),
        amount,
        description,
        status: "success"
    };

    transactions.push(transaction);

    res.json(transaction);
});

app.get("/transactions", (req, res) => {
    res.json(transactions);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.post("/pay", async (req,res)=>{

  try{

    const response = await axios.post(
      "http://10.0.2.199:4000/pay",
      req.body
    )

    res.json(response.data)

  }catch(err){

    res.status(500).send(err.message)

  }

})

app.listen(3000,()=>{
  console.log("Web App running on port 3000")
})
  */
 const express = require("express")
const cors = require("cors")
const axios = require("axios")
const path = require("path")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,"public")))

/* CREATE PAYMENT */

app.post("/pay", async (req,res)=>{

try{

const response = await axios.post(
"http://10.0.2.199:4000/pay",
req.body
)

res.json(response.data)

}catch(err){

res.status(500).send(err.message)

}

})

/* FETCH TRANSACTIONS */

app.get("/transactions/:account_id", async (req,res)=>{

try{

const response = await axios.get(
`http://10.0.2.199:4000/transactions/${req.params.account_id}`
)

res.json(response.data)

}catch(err){

res.status(500).send(err.message)

}

})

app.listen(3000,()=>{
console.log("Web App running on port 3000")
})