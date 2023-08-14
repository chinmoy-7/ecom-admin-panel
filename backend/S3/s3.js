// import  AWS from 'aws-sdk'
const { S3Client } =require('@aws-sdk/client-s3')
const dotenv = require("dotenv")
dotenv.config()
const region=process.env.AWS_REGION
const secret=process.env.AWS_SECRET
const access = process.env.AWS_ACCESS
let s3;
 s3=new S3Client({
    credentials:{
        accessKeyId:access,
        secretAccessKey:secret
    },
    region:region

})

module.exports={s3}