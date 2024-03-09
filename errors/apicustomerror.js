class APICustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createAPICustomError = (statusCode, message) => {
  return new APICustomError(statusCode, message);
};

module.exports = { APICustomError, createAPICustomError };
