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