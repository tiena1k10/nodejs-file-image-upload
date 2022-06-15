const product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { CustomError } = require("../errors");
const fs = require("fs");
const uploadProductImageLocal = async (req, res,) => {
    // if file exis
    if (!req.files) {
        throw new CustomError.BadRequestError("No file uploaded", StatusCodes.BAD_REQUEST);
    }
    const productImage = req.files.image;
    if (!productImage.mimetype.startsWith("image")) {
        throw new CustomError.BadRequestError("Not an image", StatusCodes.BAD_REQUEST);
    }
    const maxFileSize = 1 * 1024 * 1024;
    if (productImage.size > maxFileSize) {
        throw new CustomError.BadRequestError("Image is too big", StatusCodes.BAD_REQUEST);
    }
    // check format
    // check size
    const imgPath = path.join(__dirname, "../public/uploads/" + `${productImage.name}`);
    await productImage.mv(imgPath);
    return res.status(StatusCodes.OK).json({ image: { src: `uploads/${productImage.name}` } });
}
const cloudinary = require('cloudinary').v2;

const uploadProductImage = async (req, res,) => {
    // if file exis
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, { use_filename: true, folder: "file-upload" });
    fs.unlinkSync(req.files.image.tempFilePath);
    res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
}

module.exports = { uploadProductImage };