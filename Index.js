const express = require('express');
const app = express();
const ejs = require("ejs");
const router = express.Router();
const path = require("path");
// const mongoose = require('mongoose');
//connection start
var MongoClient = require('mongoose');
var url = "mongodb+srv://Sanjna:san108@cluster0.pyaf6bw.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url,{
    useNewUrlParser: true,
  useUnifiedTopology: true
})
var userSchema = new MongoClient.Schema({
    name: String,
    name: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
 email: String,
 email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},

})

// const userSchema = {
//     name: String,
//     email: String,
//     // password: Number,
//   };

//   const User = MongoClient.model("User",userSchema);
MongoClient.model("Contact", userSchema);

  app.get("/contact", function(req, res){
    res.render("contact");
});
  
app.post("/contact", function (req, res) {
    console.log(req.body.email);
  const contact = new Contact({
    name: req.body.name,  
    email: req.body.email,
    //  password: req.body.password,

  });
  contact.save(function (err) {
      if (err) {
          throw err;
      } else {
        res.render("contact");
      }
  });
});
// end


app.use(express.static('public'));

//set view engine
app.set("view engine","ejs");
// app.set('views',);
// app.use(express.static(__dirname));


    // app.use('/',router)
app.get('/',(req,res) => {
    // res.render("")
    res.sendFile(__dirname + '/views/home.html');
 
    // res.send(" <h1> hello world </h1> ");
})

// app.get('/add_user', function(req, res) { 
// //    res.sendFile(path.join(__dirname + '/connection/about.html ')); 
// // res.render("about.html");
// res.sendFile(__dirname + '/views/add_user.html');
     
// }); 
    app.use('/', router);

// app.post('/', function (req, res) {
//    console.log("Got a POST request for the homepage");f
//    res.send('Hello POST');
// })

// router.get('/about', function(req, res) { 
//         res.sendFile(path.join(__dirname + '/about.html')); 
//     }); 


// MongoClient

    

app.listen(3005, (req,res)  => {
    console.log('server started');
})
