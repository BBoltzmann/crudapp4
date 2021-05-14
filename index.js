const User = require('./userModel')
const mongoose = require('mongoose')
const express = require('express');
const { db } = require('./userModel');
const dbAddress = 'mongodb://localhost:27017/newCRUD3'
const port = process.env.PORT || 5000
const app = express()
    // parse request payload
app.use(express.urlencoded({ extended: false }))
    // parse json
app.use(express.json())



mongoose.connect(dbAddress, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, (err) => {
        if (err) console.error("can not connect to db")
        console.log("connected to db")
    })
    // parse request payload



app.get('/', (req, res) => {
    //user.find() returns a promise hence requuires async function
    User.find({})
        .then((data) => { res.status(200).json({ message: "successful", data: data }) })
        .catch((err) => { res.status(500).json({ error: err }) })

})


app.post('/', (req, res) => {
    let user = new User({ name: req.body.name, email: req.body.email, country: req.body.country })
        //then save that instance you created
    user.save()
        .then((data) => { res.status(200).json({ message: "successful", data: data }) })
        .catch((err) => { res.status(500).json({ error: err }) })

})


app.get('/:name', (req, res) => {
    //user.find() returns a promise hence requuires async function
    User.findOne({ name: req.params.name })
        .then((data) => {
            if (data === null) {
                res.status(200).json({ message: "User not found", data: data })
            } else { res.status(200).json({ message: "successful", data: data }) }
        })
        .catch((err) => { res.status(500).json({ error: err }) })

})


app.delete('/:name', (req, res) => {
    //user.find() returns a promise hence requuires async function
    User.findOneAndDelete({ name: req.params.name })
        .then((data) => {
            if (data === null) {
                res.status(200).json({ message: "User not found", data: data })
            } else { res.status(200).json({ message: `deleted ${data}`, data: data }) }
        })
        .catch((err) => { res.status(500).json({ error: err }) })

})


app.patch('/:name', (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate({
        name: req.params.name
    }, {
        $set: req.body
    }).then(() => {
        res.status(200).send({ message: "success" });
    }).catch(err => {
        res.status(500).send(err.message);
    })
});


app.listen(port, () => console.log('server is running'))