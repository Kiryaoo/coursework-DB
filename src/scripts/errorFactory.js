const formError = (message, statusCode, details = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
};

const errorFactory = {
  missingFields: () => formError("Missing fields", 400),
  notFound: () => formError("Resource not found", 404),
  createError: (details) => formError("Create error", 500, details),
  getError: (details) => formError("Get error", 500, details),
  updateError: (details) => formError("Update error", 500, details),
  deleteError: (details) => formError("Delete error", 500, details),
};

export default errorFactory;
