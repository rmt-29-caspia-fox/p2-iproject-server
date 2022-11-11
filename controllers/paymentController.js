const axios = require('axios');
const { User, History, Product } = require("../models/index")


class PaymentController {
  static getTokenPayment(req,res){
    let getCurrentTimestamp = () => {
      return "" + Math.round(new Date().getTime() / 1000);
    };
    const UserId = req.user.id
    const {productId, address, provinceId, cityId, totalPrice, shippingCost} = req.body
    const user = User.findByPk(UserId)

    axios({
      url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from("SB-Mid-server-A54PLCyjv_CfrM4URUuIXBV_").toString("base64")
      },
      data:
        {
          transaction_details: {
            order_id: "order-csb-" + getCurrentTimestamp(),
            gross_amount: totalPrice
          },
          credit_card: {
            secure: true
          },
          customer_details: {
            first_name: user.fullName,
            last_name: user.fullName,
            email: user.email,
            phone: user.phoneNumber
          }
        }
    }).then( snapResponse => { 
        let snapToken = snapResponse.data.token;
        const history = History.create({
          UserId: UserId,
          ProductId: productId, 
          address: address, 
          ProvinceId: provinceId, 
          CityId: cityId,
          totalAmount: totalPrice,
          token: snapToken,
          status: "waiting payment"
        })
        // console.log("Retrieved snap token:", snapToken);
        // Pass the Snap Token to frontend, render the HTML page
        // res.send(getMainHtmlPage(snapToken, handleMainRequest));
        res.status(200).json({token : snapToken})
      })
  }
  
  static async updatePayment(req, res, next){
    try {
      const {id} = req.params
      const history = await History.update({status: "done"}, {where: { token : id}})
      res.status(200).json({status: "updated"})
    } catch (err) {
      next(err)
    }
  }

  static async getHistory(req, res, next){
    try {
      const UserId = req.user.id
      const history = await History.findAll({where: { UserId: UserId},
      include: [User, Product ]})
      res.status(200).json(history)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = PaymentController