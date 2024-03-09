const { APICustomError } = require("../errors/apicustomerror");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof APICustomError) {
    return res
      .status(err.statusCode)
      .json({ success: false, msg: err.message });
  }
  res.status(500).json({
    success: false,
    msg: err.message,
  });
};
module.exports = errorHandlerMiddleware;
