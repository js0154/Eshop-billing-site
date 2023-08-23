const express= require('express');
const Routes= express.Router();
const User= require('../Models/Category');
const Category = require('../Models/Category');

Routes.get(`/`, async (req, res)=>{
    const getcatergories= await User.find();

    if(!getcatergories){
        res.status(500).json({success: false})
    }
    res.send(getcatergories);
})

Routes.post('/',async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        colour: req.body.colour

    })
    category = await category.save();

    if(!category)
    return res.status(404).send('the category cannot be created!')

    res.send(category);
})

Routes.put('/:id',async(req, res)=>{
    const category =  await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        {new: true}
    )
})

Routes.get('/:id', async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category){
        res.status(500).json({message:'The category with the given ID was not found'})
    }
    res.status(200).send(category);
})

module.exports = Routes;