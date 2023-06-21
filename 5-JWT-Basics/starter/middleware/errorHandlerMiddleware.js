const CustomAPIError = require("../errors/custom-error");
const {StatusCodes} = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    console.log('went inside')
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.log('came in out')
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: `Something went wrong, try again later :(` });
};

module.exports = errorHandlerMiddleware;
