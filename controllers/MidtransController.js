const midtransClient = require('midtrans-client');
const nodeMailer = require('../api/nodeMailer');
let order_id = 32261

// Create Snap API instance
class MidtransController {
	static async getTokenMidtrans(req,res,next){
		let userEmail = req.user.email
		const server_key = process.env.SERVER_KEY
		let snap = new midtransClient.Snap({
			isProduction : false,
			serverKey : server_key
	});
order_id = order_id + 1
let parameter = {
	"transaction_details": {
			"order_id": `ORDERID-${order_id}`,
			"gross_amount": req.body.price
	}, 
	"credit_card":{
			"secure" : true
	},
	"customer_details": {
			"first_name": "budi",
			"last_name": "pratama",
			"email": "budi.pra@example.com",
			"phone": "08111222333"
	}
};

snap.createTransaction(parameter)
	.then((transaction)=>{
			// transaction token
			let transactionToken = transaction.token;
			console.log({transactionToken});
			nodeMailer(userEmail)
			res.status(201).json({transactionToken})
		})
		
		console.log(order_id);
	}
}

module.exports = MidtransController