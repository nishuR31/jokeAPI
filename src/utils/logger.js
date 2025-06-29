let logger = (req, res, next) => {
  console.log({
    method: req.method,
    secure: req.secure,
    url: req.host + req.url,
    time: new Date().toLocaleString(),
    param: req.params,
    query: req.query,
    rateLimit: res.req.rateLimit,
    ms: res.getHeader("X-Response-Time") || "N/A", // use header if response time tracking is enabled
  });
  next();
};

export default logger;

// const logger = (req, res, next) => {
//   console.log({
//     method: req.method,
//     secure: req.secure,
//     url: `${req.hostname}${req.originalUrl}`,
//     time: new Date().toLocaleString(),
//     param: req.params,
//     rateLimit: req.rateLimit, // access directly from `req` if middleware added it
//     ms: res.getHeader("X-Response-Time") || "N/A", // use header if response time tracking is enabled
//   });
//   next();
// };

// export default logger;
