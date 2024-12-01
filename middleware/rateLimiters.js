const rateLimit = require('express-rate-limit')

exports.logInLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  // message: 'Too many requests. Try again later.'
  handler: (req, res, next) => {
    let err = new Error("Too many requests. Try again later.");
    err.status = 429;
    next(err)
  }
})