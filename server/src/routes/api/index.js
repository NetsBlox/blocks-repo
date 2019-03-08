// express routes
const router = require('express').Router({ mergeParams: true });

router.use('/users', require('./users'));
router.use('/uploads', require('./uploads'));

module.exports = router;
