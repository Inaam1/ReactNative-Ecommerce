const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();
const Product = require("./Schemas/ProductSchema");

app.get('/', (req, res) => {
    res.send("Welcome to Server!!")
})

//Add a new user
app.post('/add', async (req, res) => {

    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image
        });
        await product.save();
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
})

//Get All Products
app.get('/all', async (req, res) => {
    try {
        const product = await Product.find({});
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
})

//Updting a Productt
app.put('/update/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, {
            name: req.body.name,
            price: req.body.price,
            image: req.body.image
        }, {new: true})
        res.send(product)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Deleting a Product
app.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        res.send(product);
    } catch (error) {
        res.status(500).send(error)
    }
})

mongoose.connect('mongodb+srv://inaamchill:inaam17632@app.nkk4y.mongodb.net/?retryWrites=true&w=majority&appName=app')
    .then(() => {
        console.log("Database Connected.....")
    })

app.listen((5000), () => {
    console.log("Server Running on port 5000")
})