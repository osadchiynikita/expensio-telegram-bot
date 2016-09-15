'use strict';

const router = require('express').Router();
const userRouter = require('./user');

/**
 * Api routes
 */

router.use('/user', userRouter);

/**
 * Error handling
 */

router.use((err, req, res, next) => {
  // treat as 404
  if (err.message
    && (~err.message.indexOf('not found')
    || (~err.message.indexOf('Cast to ObjectId failed')))) {
    return next();
  }

  console.error(err.stack);

  if (err.stack.includes('ValidationError')) {
    res.status(422).render('422', { error: err.stack });
    return;
  }

  // error page
  res.status(500).render('500', { error: err.stack });
});

// assume 404 since no middleware responded
router.use((req, res) => {
  res.status(404).render('404', {
    url: req.originalUrl,
    error: 'Not found'
  });
});

module.exports = router;