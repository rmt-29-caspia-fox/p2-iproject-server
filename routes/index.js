const router = require('express').Router()
const admin = require('./admin')
const customer = require('./customer')

router.use('/admin',admin)
router.use('/customers',customer)

module.exports = router