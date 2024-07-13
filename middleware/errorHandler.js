const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  return res.json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};

export { errorHandler };
