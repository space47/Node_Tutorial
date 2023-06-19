const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err)
  if (err instanceof CustomAPIError) {
    // console.log('went inside')
    return res.status(err.statusCode).json({ msg: err.message });
  }
  // console.log('came in out')
  return res
    .status(500)
    .json({ msg: `Something went wrong, try again later :(` });
};

module.exports = errorHandlerMiddleware;
