const { throwError, success } = require("../helper/Response");
const product = require("../Models/vi_products");
const { s3 } = require("../S3/s3");
const util = require("../helper/utl");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require("sharp");
const { getAllProducts, getProduct, updateProduct, deletProduct } = require("../service/product");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const addItemController = async (req, res) => {
  try {
    const { product_name, price, quantity, description } = req.body;

    if (req.user.is_admin == 0) {
      return throwError(req, res, 401, { message: "Not Admin" });
    }
    const imageName = await util.randomName();

    await util.uploadS3(req, imageName);

    const prodObj = {
      product_name: product_name,
      price: price,
      s3_image_name: imageName,
      quantity: quantity,
      description: description,
      is_deleted: 0,
    };

    const uploadedImage = await product.create(prodObj);

    success(req, res, uploadedImage);
  } catch (error) {
    throwError(req, res, 500, error.message);
  }
};

const getAllItemController = async (req, res) => {
  try {
    const products = await getAllProducts();
    const allProducts = await util.searchS3(products);
    success(req, res, allProducts);
  } catch (error) {
    throwError(req, res, 500, error.message);
  }
};

const getItemConrtoller = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProduct(id, util.searchS3);
    if (!product)
      return throwError(req, res, 404, { message: "No item found" });
    success(req, res, product);
  } catch (error) {
    throwError(req, res, 500, error.message);
  }
};

const editItemController = async (req,res) => {
  console.log(req.body,"<===edit>>>")
  try {
    if(req.user.is_admin==1){
    let imageName;
    if (req.file) {
      imageName = await util.randomName();
      await util.uploadS3(req, imageName);
    }
    if(imageName) req.body.s3_image_name=imageName
    await updateProduct(req.body)
    return success(req,res,{message:"successfully updated"})
    }
    throwError(req,res,401,{message:"Not admin"})
  } catch (error) {
    throwError(req, res, 500, error.message);
  }
};

const deleteProduct = async(req,res)=>{
  try {
    if(req.user.is_admin==1){
      const deletedProduct = await deletProduct(req.params.id)
      console.log(deleteProduct)
      success(req,res,"Deleted Successfully")
    }
  } catch (error) {
    throwError(req,res,500,error.message)
  }
}


module.exports = {
  addItemController,
  getAllItemController,
  getItemConrtoller,
  editItemController,
  deleteProduct
};
