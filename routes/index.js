const express = require('express')
const router = express.Router()
const userRouter = require('./users')
const categoriesRouter = require('./categories')

router.get('/test', (req, res) => {
  res.status(200).json({message: "OK"})
})

router.use('/users', userRouter)
router.use('/categories', categoriesRouter)

module.exports = router