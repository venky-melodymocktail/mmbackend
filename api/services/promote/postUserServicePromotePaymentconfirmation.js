import { createOrder } from "../../../utils/neutrodev.js"

var defaultCollection = "report"
var defaultModel = MODELS[defaultCollection].model
const PROMOTION_COST_PER_DAY = 100

const postUserServicePromotePaymentconfirmation = async (req, res) => {

    try {


        const orderId = req.body.orderId;
        if (!orderId) {
            res.status(400).send({ message: "Bad Request" })
            return
        }
        const orderModel = MODELS["orders"].model

        //check if orderId exists
        let order = await orderModel.findOne({ _id: orderId })
        if (!order) {

            res.status(400).send({ message: "Invalid OrderId" })
            return
        }
        //check if order is already processed
        if (order.processed) {
            res.status(400).send({ message: "Order already processed" })
            return
        }
        //validate payment



        //update promotion details of the service
        let promotionData = order.otherData.promotionData;
        const serviceType = promotionData.serviceType;
        const serviceId = promotionData.serviceId;

        const serviceModel = MODELS[serviceType].model
        const updateObj = {
            status: true,
            promotionFrom: promotionData.fromDate,
            promotionTo: promotionData.toDate,
        }
        var data = await serviceModel.updateOne({ _id: serviceId }, { $set: { promotion: updateObj } })
        await orderModel.updateOne({ _id: orderId }, { $set: { processed: true } })



        res.send(data)

    } catch (error) {
        res.send(error)
    }


}

export default postUserServicePromotePaymentconfirmation