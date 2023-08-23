const express= require('express');
const Routes= express.Router();
const User= require('../Models/User');
const bcryptjs= require('bcryptjs');
const jwt= require('jsonwebtoken');

Routes.get(`/`, async (req, res)=>{
    const getuser= await User.find().select('-password');

    if(!getuser){
        res.status(500).json({success: false})
    }
    res.send(getuser);
})

Routes.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password');

    if(!user){
        res.status(500).json({message:'The user with the given ID was not found'})
    }
    res.status(200).send(user);
})


Routes.post('/',async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        cart: req.body.cart,
        addressL1: req.body.addressL1,
        addressL2: req.body.addressL2,
        areapin: req.body.areapin,
        city: req.body.city,
        country: req.body.country
    })
    user = await user.save();

    if(!user)
    return res.status(404).send('the user cannot be added!')

    res.send(user);
})

Routes.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcryptjs.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }
})

Routes.post('/register', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        addressL1: req.body.addressL1,
        addressL2: req.body.addressL2,
        areapin: req.body.areapin,
        city: req.body.city,
        country: req.body.country
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})



module.exports = Routes;

