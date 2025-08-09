// ApiError class for handling API errors
class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = [], statck = "") {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.message = message;
    this.data = null;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
