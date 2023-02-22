
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require('path')
const User = require("./Model/model");
const { default: mongoose } = require("mongoose");

var url = "mongodb+srv://sanjna:123456s@cluster0.m7htwkp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url);

app.set("view engine", "html");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('views'))
app.use(express.static(__dirname));

app.use('/index', express.static(path.join(__dirname, 'views')))

app.get("/", function (req, res) {
    res.render("home");
});

app.post("/login", async (req,res)=>{
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    console.log(user);
   res.send("<h2>Data entered</h2>")
})

// app.get("/login", function (req, res) {
//    res.sendFile(__dirname + '/views/index.html');
 
//     // res.render("index.html");
// });

app.listen(100,(req,res)=>{
    console.log("Server Has Started!");
})
