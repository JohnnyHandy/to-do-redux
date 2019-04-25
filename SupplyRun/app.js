var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var passport = require("passport");
var LocalStrategyUser = require("passport-local").Strategy;
var User = require("./models/user");
var Machine = require("./models/machine");
var Job = require("./models/job")
var session = require('express-session');
var flash = require('connect-flash');
var methodOverride = require("method-override");



mongoose.connect('mongodb://localhost:27017/SupplyRun_v0', { useNewUrlParser: true });

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));

//PASSPORT CONFIGURATION
app.use(session({
    secret: "Mar do macaco",
    resave: false,
    saveUninitialized:false,
    cookie : {
        secure:false,
        expires: false,
    }
}));


//USER
app.use(passport.initialize());
app.use(passport.session());

passport.use('user',new LocalStrategyUser(User.authenticate()));
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


// app.use('/employeelogin',session({
//     secret: "Baia formosa",
//     resave: false,
//     saveUninitialized:false,
//     cookie : {
//         secure:false,
//         expires: false,
//     }
// }));

// app.use('user',cookieParser('Mar do macaco'));
// app.use('employee',cookieParser('Baia formosa'));


// passportUser.serializeUser(User.serializeUser());
// passportUser.deserializeUser(User.deserializeUser());






app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentEmployee = req.employee;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.get("/", function(req,res){

       res.render("home"); 
       console.log("is authenticated ==>"+req.isAuthenticated());
       console.log("req.session.messages =>"+req.session.messages);
});

//REGISTER NEW EMPLOYEE
app.get("/newemployee", function(req,res){
    res.render("employee/employeeform");
});

//New Employee register route
app.post("/newemployee", function(req,res){
    
    let newEmployee = new User({
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        birth:req.body.birth,
        adress:req.body.adress,
        education:req.body.education,
        experience:req.body.experience,
        role:req.body.role,
        
        
    });
     if(req.body.role === "Manager"){
            newEmployee.accountType = 2;
        } else {
            newEmployee.accountType = 3; 
        }
     User.register(newEmployee, req.body.password, function(err,employee){
        if(err){
            console.log(err);
            res.render("employee/employeeform");
        } else{
            
            console.log("employee registered with success");
        }
        if(req.isAuthenticated()){
            req.flash('sucess', 'Profile created');
            res.redirect("/employees");
            } else {
         passport.authenticate("user")(req,res,function(){
            req.flash('success', 'Welcome '+req.user.username);
            res.redirect("/");
        
        })}
        
    });
      
});

//EMPLOYEE ACCOUNT MANAGEMENT ROUTES
app.get('/employees/:id/manage', function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error', 'Something went wrong');
            console.log(err);
        } else {
             res.render('employee/editEmployee',{user:foundUser});
        }
    });
});


app.put('/employees/:id', function (req,res){
    User.findByIdAndUpdate(req.params.id,req.body.user,function(err,user){
        if(err){
            req.flash('error', err.message)
            res.redirect('/employees/'+req.params.id+'/manage')
        } else {
            req.flash('success', user.username+' profile edited!')
            res.redirect('/employees')
        }
    })
})


//EMPLOYEES LIST
app.get('/employees', function(req,res){
    User.find({}, function(err,foundEmployee){
        if(err){
            console.log(err);
        } else{
            res.render('employee/employees', {employee:foundEmployee});
        }
    });
    
});


app.get('/newclient', function(req,res){
    res.render('client/newclient')
})

app.post("/newclient", function(req,res){
    
    let newClient = new User({
        username:req.body.username,
        companyName:req.body.companyName,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        adress:req.body.adress,
        companyNiche:req.body.companyNiche,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email,
        accountType:4,
        isClient:true
    });
     User.register(newClient, req.body.password, function(err,client){
        if(err){
            console.log(err);
            res.render("client/newclient");
        } else{
            
            console.log("Provider registered with success");
        }
        if(req.isAuthenticated()){
            req.flash('success', ' Client Profile created');
            res.redirect("/clients");
            } else {
         passport.authenticate("user")(req,res,function(){
            req.flash('success', 'Welcome '+req.user.username);
            res.redirect("/");
        
        })}
        
    });
      
});

//CLIENT ACCOUNT MANAGEMENT

app.get('/clients/:id/manage', function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error', 'Something went wrong');
            console.log(err);
        } else {
             res.render('client/editClient',{user:foundUser});
        }
    });
});


app.put('/clients/:id', function (req,res){
    User.findByIdAndUpdate(req.params.id,req.body.user,function(err,user){
        if(err){
            req.flash('error', err.message)
            res.redirect('/clients/'+req.params.id+'/manage')
        } else {
            req.flash('success', user.username+' profile edited!')
            res.redirect('/clients')
        }
    })
})

//CLIENTS LIST
app.get('/clients', function(req,res){
    User.find({accountType:5}, function(err,foundClient){
        if(err){
            console.log(err)
        } else{
            res.render('client/clients', {client:foundClient})
        }
    })
})


//JOB ROUTES
app.get('/jobs', isLoggedIn, function(req,res){
    
})

app.get('/newjob',isLoggedIn,function(req,res){
    res.render('job/newjob')
})

app.post('/newjob',isLoggedIn, function(req,res){
    let newJob = new Job({
        description:req.body.description,
        product:req.body.product,
        quantity:req.body.quantity,
        expireTime:req.body.expireTime,
        term:req.body.term,
        contractor:req.user._id
        
    });
    newJob.save(function(err,job){
        if(err){
            console.log(err)
            req.flash("error", err.message)
        } else{
            job.contractor.id = req.user._id;
            job.contractor.contractorName=req.user.username;
            job.save()
            req.flash("success","Job created with sucess")
            res.redirect('/newjob')
               
        }
        
    })
    
})



//MACHINES/TRUCKS ROUTES

app.get('/machinelist',function(req,res){
    Machine.find({}, function(err,foundMachine){
        if(err){
            console.log(err)
        } else{
            res.render('machine/machinelist', {machine:foundMachine})
        }
    })
})

app.get('/newMachine',function(req,res){
    res.render("machine/newMachine")
})

app.get('/newtruck', function(req,res){
    res.render("machine/newTruck")
})

app.get('/newcar',function(req,res){
    res.render("machine/newCar")
})

app.get("/newfork",function(req,res){
    res.render("machine/newFork")
})

app.post('/newtruck', function(req,res){
    let newTruck = new Machine({
        manufacturer : req.body.manufacturer,
        model : req.body.model,
        plate : req.body.plate,
        isTruck: true
    });
    //  req.flash("success", "New Truck registrated")
    //  res.redirect("/newmachine")
    newTruck.save(function(err) {
        if (err){
           console.log(err);
           res.render("machine/newTruck")
       } else {
           req.flash('success','Truck registered')
           res.redirect("/newmachine")
       }
    });
})

app.post('/newcar',function(req,res){
    let newCar = new Machine({
        manufacturer : req.body.manufacturer,
        model : req.body.model,
        plate : req.body.plate,
        isCar: true
    });
     newCar.save(function(err) {
        if (err){
           console.log(err);
           res.render("machine/newCar")
       } else {
           req.flash('success','Car registered')
           res.redirect("/newcar")
       }
    });
})

app.post("/newfork",function(req,res){
    let newFork = new Machine({
        manufacturer : req.body.manufacturer,
        model : req.body.model,
        plate : req.body.plate,
        isFork: true
    });
     newFork.save(function(err) {
        if (err){
           console.log(err);
           res.render("machine/newFork")
       } else {
           req.flash('success','Fork-Lift registered')
           res.redirect("/newfork")
       }
    });
})

//COMMON USER ROUTES


//show register form
app.get("/register", function(req,res){
    res.render("register");
});

//handle sign up logifc
app.post("/register", function(req,res){
    var newUser = new User({username:req.body.username});
    if(req.body.adminCode === 'secret') {
      newUser.isAdmin = true;
      newUser.accountType = 0;
    }
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }
        passport.authenticate("user")(req,res, function(){
            res.redirect("/");
        });
    });
});



//SHOW LOGIN FORM
 app.get("/login", function(req,res){
     res.render("login");
 });
 
 //handling login logic
 app.post("/login", passport.authenticate("user",{successRedirect:"/",failureRedirect:"/login"}),function(req,res){
 });

// LOGOUT ROUTE
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});





function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
        
    }
    res.redirect("/login");
}



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App has started");
});