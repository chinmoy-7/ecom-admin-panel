const vi_products = require("../Models/vi_products");
const getAllProducts = async () => {
  const allProd = await vi_products.findAll({
    where: {
      is_deleted: 0,
    },order:[
        ["id","DESC"]
    ]
  });
  return allProd;
};
const getProduct = async (id, searchS3) => {
  const prod = await vi_products.findOne({
    where: {
      id: id,
    },
  });
  let prodArr = [prod];
  let arr = await searchS3(prodArr);
  return arr;
};

const updateProduct = async (obj) => {
  const option = {
    where: {
      id: parseInt(obj.id),
    },
  };
  const updateData = {};
  console.log(obj, "<obj=============");
  if (obj.product_name) {
    updateData.product_name = obj.product_name;
  }
  if (obj.price) {
    updateData.price = parseInt(obj.price);
  }
  if (obj.quantity) {
    updateData.quantity = parseInt(obj.quantity);
  }
  if (obj.description) {
    updateData.description = obj.description;
  }
  if (obj.s3_image_name) {
    updateData.s3_image_name = obj.s3_image_name;
  }
  console.log(updateData, "<update===========", option);
  const update = await vi_products.update(updateData, option);
  console.log(update);
  return;
};

const deletProduct = async (id) => {
  const result = await vi_products.update(
    { is_deleted: 1 },
    {
      where: {
        id: id,
      },
    }
  );
  return result;
};

module.exports = { getAllProducts, getProduct, updateProduct, deletProduct };
