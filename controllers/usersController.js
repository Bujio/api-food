const User = require('../models/User.model');

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, image } = req.boby;
    const user = { name, email, password, image };
    console.log(user)
    await User.create(user);
    res.status(201).json();
  } catch (error) {
    next(error);
  }
};

module.exports.getList = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'Hola desde listado usuarios' });
  } catch (error) {
    next(error);
  }
};
