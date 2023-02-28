const express=require('express');
const path=require('path')
const port=3000;
// import jsdom
const jsdom = require('jsdom')


const dom = new jsdom.JSDOM("")


const db = require("./config/mongoose");
const Contact = require("./models/contact")
const jQuery = require('jquery')(dom.window)
const $ = require('jquery')(dom.window)

const app=express();
// first we have to tell express that ejs is the template engine we are using..

app.set('view engine','ejs');   //we will not require any thing it will automatically find out

app.set('views',path.join(__dirname,'views'));    //path.join is a in build function to join to paths and if you will not the views ,
// -- this will automatically select from views folder as this is default..
app.use(express.urlencoded());   //app.use is a middleware //only used by form data not the params
//why middleware is needed? so there are some common things we need to do  like preprocessing data for ex :whenever our form was submitting data in key value pair which was encoded while it was send from the browser so we need it for every form ?yes .
// if app.use is a middleware then express.urlencoded is a function that is called before every controller that is there..it takes the request and it reach the data and analyses it and converts the form data into req.body
app.use(express.static('assets'));

//middleware1
// app.use(function(req,res,next){
//     console.log("middleware 1 is called");
//     next();
// });
//from observation i saw that te middleware is called when every get post or you can say page loads aur some controller function is intiated thus this is called ! 

///middleware 2
// app.use(function(req,res,next){
//     console.log("middleware 2 is called");
//     next();
// });


var contactList = [
    // {
    //      name:"Aditi",
    //      phone:"111111111111111"
    // },
    // {
    //     name:"Charu",
    //     phone:"111111111110000"
    // },
    {
        name:"Lalit",
        phone:"222222222222222 "
    }

]
app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
       if (err){
          console.log("Error in fetching contacts from db");
          return;
       }
       res.render('home',
       {
        title:"My Contacts List",
        contact_list:contacts
        });
    });
//    $(".contacts").click(function(e){
//          let id= req.params.id;
//           console.log(id);
//       });
});

app.get('/practise',function(req,res){
      res.render('practise',{title:"Let us play with ejs"});
});

app.post("/create-contact",function(req,res){
//   return res.redirect("/practise");
    // console.log(req.body);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone 
    }, function (err,newContact){
        if(err){console.log('error in creating a contact!');
        return;
    }

       console.log("*****************",newContact);
       return res.redirect("back");
    });
    
});

app.get('/delete-contact/',function(req,res){
  
    let id= req.query.id;
     
    Contact.findByIdAndDelete(id,function(err){
        if(err)
           {console.log("error in deleting an object from database");
           return;}
     return res.redirect('back');
    });

});

app.listen(port,function(err){
if(err)
{ console.log(' Error in running the server',err);           
  }
  console.log(' Yup ! My express is running on the port: ', port);
  
// app.get('/create-contact',function(req,res){
      
});
