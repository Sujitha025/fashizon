const port = 4000;
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json())
app.use(cors());

//mongodb+srv://Sujitha:<password>@cluster0.xe2ubnv.mongodb.net/

//Database connection with mongodb

const connectionString = "mongodb+srv://Sujitha:Sujitha%4025@cluster0.xe2ubnv.mongodb.net/e-commerce";

mongoose.connect(connectionString).then(() => {
    console.log("Connected to the database successfully!");
}).catch((error) => {
    console.error("Error connecting to the database:", error);
});
//API Creation
app.get("/",(req,res)=>{
    res.send("Express App is running");
})
//image storage engine
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})

//create upload endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for creating products
const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})
//for adding products
app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({})
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name
    })
})
//creating api for removing product
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

// creating api for getting all products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

//schema creating for user Model
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
//creating endpoint for registering the user
app.post('/signup',async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"email already address"});
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i] = 0;
    }
    const user = new Users({
        name : req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,

    })
    await user.save();
    //jwt authentication

    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecommerce')
    res.json({success:true,token})
  
})

//creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret-ecommerce');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,error:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,error:"Wrong Email Id"})
    }



})
//creating endpoint for newcollection data
app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("newcollection fetched");
    res.send(newcollection);
})
//creating endpoint for popular in women data
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"})
    let popular_in_women = products.slice(0,4);
    console.log("polular in women fetched");
    res.send(popular_in_women);
})
//middleware to fetch user
const fetchUser= async(req,res,next)=>{
    const token = req.header('auth-token');
    //console.log(token);
    if(!token){
        res.status(401).send({errors:"please authenticate using valid token"})
    }
    else{
        try{
            const data = await jwt.verify(token,'secret-ecommerce');
            req.user = data.user;
            next();
        }
        catch(error){
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    }
} 

//creating endpoint for adding products in Cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("added",req.body.itemId);
 let userData = await Users.findOne({_id:req.user.id});
 userData.cartData[req.body.itemId]+=1;
 await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
 res.send("Added");
   
})
//creating endpoint to remove product from cartData
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId]-=1;
    }
 await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
 res.send("removed");
})
//creating endpoint for cart data
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("get carted");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})
app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on Port:"+port);
    }
    else{
        console.log("Error: "+error);
    }
})