const express = require('express');
const app = express();
const bodyParser=  require('body-parser');
const morgan= require('morgan');
const mongoose= require('mongoose');
const { error } = require('console');
const auth= require('./Helpers/jwt');
const errorHandler=require('./Helpers/errorhandler');


require('dotenv/config');


//middleware 
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(auth());
app.use(errorHandler);

//Routes
const productsRoute= require('D:/Study Material/Web Dev/trial billing/Routes/Products.js');
const categoriesRoute = require('../trial billing/Routes/Categories.js');
const usersRoute = require('./Routes/Users.js');
const ordersRoute = require('./Routes/Orders.js');
const authJwt = require('./Helpers/jwt');

const api  = process.env.URL;

app.use(`${api}/products`, productsRoute);
app.use(`${api}/categories`,categoriesRoute);
app.use(`${api}/users`,usersRoute);
app.use(`${api}/orders`,ordersRoute);

//Database
mongoose.connect(process.env.dbConnect,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Eshop'
})
.then(()=>{
    console.log('Database connected successfully')
})
.catch((err)=>{  
    console.log(err);
})

//Server
// connectFunc().then(() => {
    app.listen(3000, ()=>{
        console.log('server is running http://localhost:3000')
    })
// })

