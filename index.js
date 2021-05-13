const User = require('./userModel')
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

app.get('/', (req, res) => {
    const data = User.find({})
    res.status(200).json({ message: "successful", data: data })
})

app.listen(port, () => console.log('server is running'))