const crypto =require("crypto")
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require("sharp");
const { getAllProducts, getProduct } = require("../service/product");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3 } = require("../S3/s3");

//generate Random name for s3 image
const randomName=async()=>{
    return crypto.randomBytes(32).toString("hex")
}

//upload image to s3 bucket
const uploadS3=async(req,imageName)=>{
    const buffer = await sharp(req.file.buffer)
      .resize({
        height: 1080,
        width: 1080,
        fit: "cover",
      })
      .toBuffer();

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: imageName,
      Body: buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);

    await s3.send(command);
    return
}


//fetch image from s3 bucket
const searchS3=async(products)=>{

    const allProducts = await Promise.all(
        products.map(async (item) => {
          const getObjParam = {
            Bucket: process.env.S3_BUCKET,
            Key: item["s3_image_name"],
          };
          const command = new GetObjectCommand(getObjParam);
          let url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          item.dataValues["image_url"] = url;
          return item.dataValues;
        })
      );
      return allProducts
}
module.exports={randomName,uploadS3,searchS3}