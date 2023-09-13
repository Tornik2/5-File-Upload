const { StatusCodes} = require('http-status-codes')
const { BadRequestError } = require('../errors')
const path = require('path')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
async function uploadProductImageLocal(req, res) {
    // check if file exists
    if (!req.files) {
        throw new BadRequestError('Please Upload Image')
    }
    const image = req.files.image // image that is being uploaded

    //check if the file is image/ check format
    if(!image.mimetype.startsWith('image')) {
        throw new BadRequestError('Please Upload Image')
    }

    //check for size
    const maxSize = 1000
    if(image.size > maxSize) {
        throw new BadRequestError('Image size should not be bigger than 1KB')
    }
    const imagePath = path.join(__dirname, '../public/uploads/' + image.name) // path to the directory, where the image should be stored locally
    
    await image.mv(imagePath)
    res.status(StatusCodes.OK).json({ image: {src: `uploads/${image.name}`} })
} 

const uploadProductImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, 
        {
        use_filename: true,
        folder: 'cloudinary-first'
    })
    //delete the tmp folder from root
    fs.unlinkSync(req.files.image.tempFilePath)

    res.status(StatusCodes.OK).json({image: {src: result.secure_url}})

}

module.exports = {
    uploadProductImage
}