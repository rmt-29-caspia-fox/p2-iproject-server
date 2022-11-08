const express = require('express')
const router = express.Router()
const userRouter = require('./user')

router.get('/test', (req, res) => {
  res.status(200).json({message: "OK"})
})

router.use('/users', userRouter)

module.exports = router