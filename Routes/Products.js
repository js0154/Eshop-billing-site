const Product= require('../Models/Product.js');
const express= require('express');
const Routes= express.Router();
const Category= require('../Models/Category.js');
const mongoose= require('mongoose');


Routes.get(`/`, async (req, res) =>{
    let filter = {};
    if(req.query.categories)
    {
         filter = {category: req.query.categories.split(',')}
    }

    const productList = await Product.find(filter).populate('category').select('name image price rating total reviews category ');

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

Routes.get(`/:id`, async (req, res)=>{
    const product= await Product.findById(req.params.id).populate('category');

    if(!product){
        res.status(500).json({success: false})
    }
    res.send(product);
})

Routes.post(`/`, async (req, res)=>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    var product = new Product({
        name: req.body.name,
        image: req.body.image,
        images: req.body.images,
        price: req.body.price, 
        description: req.body.description,
        category: req.body.category,
        rating: req.body.rating,
        totalreviews: req.body.totalreviews,
        isFeatured: req.body.isFeatured
    })
    product = await product.save();
    if(!product)
    return res.status(500).send('The Product was not created')

    return res.send(product);
})

Routes.put('/:id',async(req, res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid Product ID')
    }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const product =  await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: req.body.image,
            images: req.body.images,
            price: req.body.price, 
            description: req.body.description,
            category: req.body.category,
            rating: req.body.rating,
            totalreviews: req.body.totalreviews,
            isFeatured: req.body.isFeatured

        },
        {new: true}
    )
    if(!product)
    return res.status(500).send('the product cant be updated')

    res.send(product)
})




Routes.get(`/get/featured`, async (req, res)=>{
    const product= await Product.find({isFeatured: true})
    if(!product){
        res.status(500).json({success: false})
    }
    res.send(product);
})

module.exports= Routes;

