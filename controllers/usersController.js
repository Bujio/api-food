

module.exports.getList = async (req, res, next) => {
  try {
    res.status(200).json({message: 'Hola desde listado usuarios'})
  } catch (error) {
    next(error)
  }
}