const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/dataUser',
{useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

//check connection
db.once('open', function(){
    console.log('Connected to MongoDB')
});

//check for errors
db.on('error', function(err){
    console.log(err);
});

const app= express();

//bring in models
let User = require('./models/dataUser');

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/',function(req,res){
    User.find({}, function(err,users){
        if(err){
            console.log(err);
        } else{
            res.render('index',{
                title: 'Bienvenue',
                users: users
            });
        }
    });
});

//add route
app.get('/users/add',function(req,res){
    res.render('add',{
        title:'Nouveau Utilisateur'
    });
});

app.get('/users/login',function(req,res){
    User.find({}, function(err,users){
        if(err){
            console.log(err);
        } else{
            res.render('login',{
                title: 'Entre dans votre compte',
                users: users
            });
        }
    });
});

//add submit
app.post('/users/add',function(req,res){
    //let user = new User();
    //user.userName = req.body.userName;
    //user.email = req.body.email;

    //user.save(function(err){
      //  if(err){
        //    console.log(err);
          //  return;
        //} else {
            //res.redirect('/');
        //}
    //});
    console.log('listo');
    console.log(req.body.userName);
   return;
});

app.listen(3000,function(req,res){
console.log('Server started on port 3000.');
});