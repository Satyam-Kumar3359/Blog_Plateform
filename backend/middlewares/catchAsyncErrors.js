// catchAsyncError is used for handling errors in async functions
// It takes a function as an argument and returns a new function that catches any errors    
// that occur during the execution of the original function
// This is useful for avoiding repetitive try-catch blocks in your code 
// and centralizing error handling in your middleware

export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};