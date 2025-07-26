class ErrorHandler extends Error {// Custom error handler class
  // This class extends the built-in Error class to create a custom error handler
  constructor(message, statusCode) {// Constructor to initialize the error message and status code
    super(message);//msg is coming from error class thatt is our super class
    this.statusCode = statusCode;
  }
}
// Middleware to catch async errors
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  //CastError is a mongoose error that occurs when an invalid ID is provided 
  if (err.name === "CastError") {
    const message = `Invalid: Resource not found: ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;