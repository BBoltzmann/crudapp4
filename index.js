const User = require('./userModel')
const mongoose = require('mongoose')
const express = require('express');
const dbAddress = 'mongodb://localhost:27017/newCRUD3'
const port = process.env.PORT || 5000
const app = express()


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
    const data = User.find({})
        .then((data) => { res.status(200).json({ message: "successful", data: data }) })
        .catch((err) => { res.status(500).json({ error: err }) })

})
app.post('/', (req, res) => {
    const user = new User({ 'name': req.body.name, 'email': req.body.email, 'country': req.body.country })
    user.save(function(err) {
        if (err) {
            console.log(err); //TypeError: user.save is not a function
        }
        res.send("user created!");
    })

})
app.use(express.urlencoded({ extended: false }))
    // parse json
app.use(express.json())
app.listen(port, () => console.log('server is running'))