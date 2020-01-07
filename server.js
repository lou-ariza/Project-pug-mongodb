const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/dataUser',
{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect('mongodb://localhost:27027/dataTache',
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
let Tache = require('./models/dataTache');


app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
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

app.get('/lists/addTache',function(req,res){
    res.render('addTache',{
        title:'Rajouter une nouvelle tache'
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

app.get('/lists',function(req,res){
    Tache.find({}, function(err,taches){
        if(err){
            console.log(err);
        } else{
            let tab = [ ];
            each tache in taches
                if (tab.includes(tache.listId)!){
                    tab.push(tache.listId);}
            res.render('lists',{
            title: 'Lists et taches',
            tab: tab
            });
        }
    });
});

//add submit
app.post('/users/add', function(req,res){
    let user = new User();
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function(err){
        if(err){
           console.log(err);
            return;
        } else {
            res.redirect('/users/login');
        }
    });
    //console.log('listo');
    //console.log(req.body);
   return;
});

//add lists submit
app.post('/lists/add', function(req,res){
    let tache = new Tache();
    tache.tacheName = req.body.tacheName;
    tache.listId = req.body.listId;
    tache.save(function(err){
        if(err){
           console.log(err);
            return;
        } else {
            res.redirect('/lists');
        }
    });
    //console.log('listo');
    //console.log(req.body);
   return;
});


//login acceder
app.post('/users/login', function(req,res){
    User.findOne({userName: req.body.userName},function(err,existingUser){
        if(req.body.password==existingUser.password){
            res.redirect('/lists');
        }else{
            res.redirect('/users/login');
        }
    });
    return;
});

app.listen(3000,function(req,res){
console.log('Server started on port 3000.');
});