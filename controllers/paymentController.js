const axios = require('axios');
class PaymentController {
  static getTokenPayment(req,res){
    let getCurrentTimestamp = () => {
      return "" + Math.round(new Date().getTime() / 1000);
    };

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
            gross_amount: 10000
          },
          credit_card: {
            secure: true
          },
          customer_details: {
            first_name: "Johny",
            last_name: "Kane",
            email: "testmidtrans@mailnesia.com",
            phone: "08111222333"
          }
        }
    }).then( snapResponse => { 
        let snapToken = snapResponse.data.token;
        // console.log("Retrieved snap token:", snapToken);
        // Pass the Snap Token to frontend, render the HTML page
        // res.send(getMainHtmlPage(snapToken, handleMainRequest));
        res.status(200).json({token : snapToken})
      })
  }
}

module.exports = PaymentController