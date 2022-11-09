const { User, Logbalance, Product, Subproduct } = require('../models')

const { encode, decode } = require('../helper/hashPass')

const {jwtSign, jwtVerify} = require('../helper/jwt')

var nodemailer = require('nodemailer');

const base_url = 'http://localhost:3000'

const client_url = 'http://localhost:5173'

class Control {

	static async postLoginGoogle(req, res, next){
		try {
			const google_token = req.headers.google_token
			console.log(google_token);
			console.log(CLIENT_ID);
			const client = new OAuth2Client(CLIENT_ID);
			const ticket = await client.verifyIdToken({
				idToken: google_token,
				audience: CLIENT_ID,
			});
			const payload = ticket.getPayload();
			// res.status(200).json({payload})
			let email = payload.email
			const [user, created] = await User.findOrCreate({
				where: {
					email: email
				},
				defaults: {
					email: payload.email,
					role: 'Staff',
					username: payload.given_name,
					password: 'auth_google'
				},
				hooks: false
			})

			let payload_jwt = {
				id: findUser.id,
				email: findUser.email,
				username: findUser.username
			}

			let access_token = encode(payload_jwt)

			res.status(200).json({
				access_token
			})
		} catch(err) {
			next(err)
		}
	}

	static async postLogin(req, res, next){
		try {
			let data = req.body

			data.email = data.email.toLowerCase()

			if(!data.email){
				throw {name: 'no_email'}
			}

			if(!data.password){
				throw {name: 'no_password'}
			}

			const findUser = await User.findOne({
				where: {
					email: data.email,
					active: true,
				}
			})

			if(!findUser){
				throw {name: 'invalid_email_password'}
			}

			const isTrue = decode(req.body.password, findUser.password)

			if(!isTrue){
				throw {name: 'invalid_email_password'}
			}

			let payload = {
				id: findUser.id,
				email: findUser.email,
				username: findUser.username
			}

			const access_token = jwtSign(payload)

			res.status(200).json({access_token})

		} catch (err) {
			next(err)
		}
	}

	static async postRegister(req, res, next){
		try {
			let data = req.body

			data.email = data.email.toLowerCase()

			if(!data.email){
				throw {name: 'no_email'}
			}

			if(!data.email.match(
      			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    		)){
				throw {name: 'no_email_format'}
			}

			if(!data.password){
				throw {name: 'no_password'}
			}

			const findUser = await User.findOne({
				where: {
					email: data.email
				}
			})

			if(findUser){
				throw {name: 'not_unique'}
			}

			data.password = encode(data.password)

			var otp = '';
			var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			var charactersLength = characters.length;
			for ( var i = 0; i < 5; i++ ) {
				otp += characters.charAt(Math.floor(Math.random() * charactersLength));
			}

			console.log(otp);

			data.otp = encode(otp)

			console.log(data.otp);

			const getUser = await User.create({
				email: data.email,
				password: data.password,
				username: data.username,
				otp: data.otp
			})

			let payload = {
				id: getUser.id,
				email: getUser.email,
				username: getUser.username
			}

			// const access_token = jwtSign(payload)

			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'magicandgun@gmail.com',
					pass: process.env.pass_mail
				}
			});
			
			var mailOptions = {
				from: 'magicandgun@gmail.com',
				to: getUser.email,
				subject: 'Verify Your Email',
				text: `Click ${base_url}/verify?id=${getUser.id}&otp=${otp} to activated your account`
			};
			
			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});

			res.status(200).json(payload)
			
		} catch (err) {
			next(err)
		}
	}

	static async verify(req, res, next){
		try {
			let id = req.query.id
			let otp = req.query.otp

			console.log(id, otp);

			const findUser = await User.findOne({
				where: {
					id: id,
					active: false
				}
			})

			if(!findUser){
				throw {name: 'invalid_id'}
			}

			const verifyIt = decode(otp, findUser.otp )

			if(!verifyIt){
				throw {name: 'invalid_otp'}
			}

			await User.update({
					updatedAt: new Date(),
					otp: null,
					active: true
				},
				{
					where: {
						id: id
					}
				}
			)
			
			res.redirect(client_url + '?status=verify_success')
			// res.status(200).json({message: 'verify_success'})
			
		} catch (err) {
			next(err)
		}
	}

	static async getProducts(req, res, next){
		try {
			const products = await Product.findAll()
			res.status(200).json(products)
		} catch (err) {
			console.log(err);
			next(err)
		}
	}

	static async getProductById(req, res, next){
		try {
			let idproduct = req.params.id
			const products = await Product.findByPk(idproduct, {
				include: {
					model: Subproduct,
					order: ['idOrder']
				}
			})
			res.status(200).json(products)
		} catch (err) {
			next(err)
		}
	}

	static async authentification(req, res, next){
		try {

			if(!req.headers.access_token){
				throw {name: 'invalid_token'}
			}

			let access_token = req.headers.access_token

			let isTrue = jwtVerify(access_token)
			// console.log(isTrue);
			if(!isTrue){
				throw {name: 'invalid_token'}
			}

			req.user = isTrue

			// console.log(res.user);

			next()
			
		} catch (err) {
			next(err)
		}
	}

	static async getUser(req, res, next){
		try {

			console.log(req.user);
			let idUser = req.user.id
			const findUser = await User.findByPk(idUser, {
				attributes: ['id', 'username', 'email', 'balance']
			})
			res.status(200).json(findUser)
		} catch(err) {
			next(err)
		}
	}

	static async postTopup(req, res, next){
		try {
			
		} catch (err) {
			
		}
	}

	static async postBuyProduct(req, res, next){
		try {
			let phone = req.body.phone
			let idsubproduct = req.params.idsubproduct
			let idUser = req.user.id
			// let emailUser = res.user.email

			if(!phone){
				throw {name: 'no_phone'}
			}
			
			const findSubProduct = await Subproduct.findByPk(idsubproduct)

			if(!findSubProduct){
				throw {name: 'product_not_found'}
			}

			const findUser = await User.findByPk(idUser)

			if(findUser.balance < findSubProduct.price){
				throw {name: 'insufficient_balance'}
			}

			const balanceNow = findUser.balance - findSubProduct.price

			const balanceBefore = findUser.balance

			await User.update({
					updatedAt: new Date(),
					balance: balanceNow
				},
				{
					where: {
						id: idUser
					}
				}
			)

			const message = `Produk ${findSubProduct.name} dengan harga ${findSubProduct.price} ke nomor ${phone} telah terbeli, sekarang sisa saldo anda adalah ${balanceNow}`

			let dataLog = {
				nominal: findSubProduct.price,
				balance_before: balanceBefore,
				balance_now: balanceNow,
				isDebit: false,
				type: "buy",
				idUser: idUser,
				phone: phone,
				idProduct: findSubProduct.idProduct,
				idSubproduct: findSubProduct.id,
				description: message
			}

			console.log(dataLog);

			await Logbalance.create(dataLog)

			res.status(201).json({message})
			
		} catch (err) {
			next(err)
		}
	}
}

module.exports = Control