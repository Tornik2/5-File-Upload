const Product = require('../models/Product')
const { StatusCodes} = require('http-status-codes')


async function createProduct(req, res) {
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({ product })
} 

async function getAllProducts(req, res) {
    const products = await Product.find({})
    res.status(StatusCodes.OK).json({ products })
} 

module.exports = {
    createProduct,
    getAllProducts
}