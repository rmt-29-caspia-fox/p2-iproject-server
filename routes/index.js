const router = require('express').Router()

const Control = require('../controllers')

router.post('/login', Control.postLogin)
router.post('/register', Control.postRegister)
router.post('/login-google', Control.postLoginGoogle)
router.get('/verify', Control.verify)

router.get('/products', Control.getProducts)
router.get('/product/:id', Control.getProductById)
router.use(Control.authentification)
router.get('/user', Control.getUser)
router.post('/topup', Control.postTopup)
router.post('/buy/:idsubproduct', Control.postBuyProduct)


module.exports = router