const sendResponse = (res, statusCode, data = null) => {
  const response = { message: "Success" };
  if (data !== null) {
    response.data = data;
  }
  res.status(statusCode).json(response);
};

export default sendResponse;
