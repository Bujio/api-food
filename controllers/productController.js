const Product = require("../models/Product.model");
require("../db");


module.exports.home = (req, res, next) => {
  return res.send("hola");
};

module.exports.createList = async (req, res, next) => {
  try {
    const createProducts = await Product.create();
    return res.status(201).json(createProducts);
  } catch (err) {
    next(err);
  }
};

module.exports.getList = async (req, res, next) => {
  try {
    const products = await Product.find().limit(12);
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updateProduct);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "product successfully deleted!!" });
  } catch (error) {
    next(error);
  }
};
