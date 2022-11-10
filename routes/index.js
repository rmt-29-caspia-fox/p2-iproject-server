const router = require('express').Router()
const userRouter = require('./user')
const gameRouter = require('./game')
const gameItemRouter = require('./gameItem')
const authentication = require('../middlewares/authentication')
// const googlelogin = require('../controllers/googlelogin.js')
const GoogleLogin = require('../controllers/OauthController')
const MidtransController = require('../controllers/MidtransController')
 
router.get('/', (req,res)=>{
	res.send('okk')
})

router.use('/users', userRouter)

router.post('/google-login', GoogleLogin.userGoogleLogin)

router.use(authentication)

router.use('/games', gameRouter)

router.use('/gameItems', gameItemRouter)

router.post('/midToken', MidtransController.getTokenMidtrans)


module.exports = router