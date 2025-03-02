import appError from "../utils/appError.js";

export const globalErrHandler = (err, req, res, next) => {
  const stack = err.stack;
  const statusCode = err?.statusCode ? err?.statusCode : 500;
  const message = err?.message || "Internal server error";
  res.status(statusCode).json({
    status: statusCode === 500 ? "error" : "fail",
    statusCode,
    message,
    stack,
  });
};

// 404 error handler
export const notFound = (req, res, next) => {
  const error = new appError(`Route  ${req.originalUrl} not found`, 404);
  next(error);
};
