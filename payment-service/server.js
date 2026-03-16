const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")

const app = express()

app.use(express.json())
app.use(cors())

/* DATABASE CONNECTION */

const db = mysql.createConnection({

host:"cloud-project-db.cla2ucqwa0yx.us-east-2.rds.amazonaws.com",
user:"admin",
password:"CloudProject5",
database:"mysql",
port:3306

})

db.connect(err=>{

if(err){
console.log("Database connection error:",err)
}else{
console.log("Connected to RDS")
}

})

/* CREATE PAYMENT */

app.post("/payment",(req,res)=>{

const {account_id,amount,merchant_name} = req.body

const transactionQuery =
"INSERT INTO transactions (account_id,amount,transaction_type,status) VALUES (?,?,?,?)"

db.query(
transactionQuery,
[account_id,amount,"payment","success"],
(err,result)=>{

if(err) return res.status(500).send(err)

const transaction_id = result.insertId

const paymentQuery =
"INSERT INTO payments (transaction_id,merchant_name,amount,status) VALUES (?,?,?,?)"

db.query(
paymentQuery,
[transaction_id,merchant_name,amount,"completed"],
(err2)=>{

if(err2) return res.status(500).send(err2)

res.json({

message:"Payment Successful",
transaction_id

})

}

)

}

)

})

/* FETCH TRANSACTIONS */

app.get("/transactions/:account_id",(req,res)=>{

const query = `
SELECT
t.transaction_id,
t.amount,
t.transaction_type,
t.status,
t.created_at,
p.merchant_name
FROM transactions t
LEFT JOIN payments p
ON t.transaction_id = p.transaction_id
WHERE t.account_id = ?
ORDER BY t.created_at DESC
`

db.query(query,[req.params.account_id],(err,result)=>{

if(err) return res.status(500).send(err)

res.json(result)

})

})

app.listen(5000,()=>{
console.log("Payment Service running on port 5000")
})