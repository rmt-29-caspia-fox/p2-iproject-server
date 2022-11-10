const axios = require('axios')
const key =  process.env.RAJA_ONKIR_CREDENTIAL
const baseUrl = "https://api.rajaongkir.com/starter"

class shippingCostController {
  static async getProvince(req, res, next){
    try {
      const { data } = await axios({
        method: "get",
        url: baseUrl + "/province",
        headers: {
          key: key,
        },
      });
      let code = data.rajaongkir.status.code
      if(code!==200){
        throw {name:"error_ext_api"}
      }
      let response = data.rajaongkir.results
      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }
  static async getCost(req, res, next){
    try {
      const {destination, weight} = req.query
      const courier = "jne"
      const origin = 35
      const { data } = await axios({
        method: "post",
        url: baseUrl + "/cost",
        data: {
          origin: origin,
          destination: destination,
          weight: weight,
          courier: courier
        },
        headers: {
          key: key,
        },
      });
      let code = data.rajaongkir.status.code
      if(code!==200){
        throw {name:"error_ext_api"}
      }
      let raw = {
        destination: data.rajaongkir.destination_details,
        cost : data.rajaongkir.results[0].costs[0]
      }
      let response = {
        city: raw.destination.type + " " + raw.destination.city_name + " - " + raw.destination.province,
        courier: courier,
        services: raw.cost.service,
        cost: raw.cost.cost[0].value 
      }
      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }
  static async getCity(req, res, next){
    try {
      const {provinceId} = req.params
      const { data } = await axios({
        method: "get",
        url: baseUrl + "/city",
        params: {
          province: provinceId
        },
        headers: {
          key: key,
        },
      });
      let code = data.rajaongkir.status.code
      if(code!==200){
        throw {name:"error_ext_api"}
      }
      let response = data.rajaongkir.results
      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = shippingCostController