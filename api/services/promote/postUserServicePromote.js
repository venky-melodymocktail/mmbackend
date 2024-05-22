import { createOrder } from "../../../utils/neutrodev.js"

var defaultCollection = "report"
var defaultModel = MODELS[defaultCollection].model
const PROMOTION_COST_PER_DAY = 100

const postUserServicePromote = async (req, res) => {

    try {

        const allowedServices = ["needaroom", "rooms", "needahome", "home", "needAride", "rides", "travelCompanion", "willBeATravelCompanion", "paymentPlatform"]
        const requiredFields = ["serviceType", "serviceId", "fromDate", "toDate",]
        let paymentPlatform = req.body.paymentPlatform
        if (!paymentPlatform) {
            paymentPlatform = 'rzp'
        }
        for (let i = 0; i < requiredFields.length; i++) {
            const e = requiredFields[i];
            if (Object.getOwnPropertyDescriptor(req.body, e)) {

            } else {
                res.status(400).send({ message: "Bad Request" })
                return

            }

        }
        const serviceType = req.body.serviceType;
        const serviceId = req.body.serviceId;
        const fromDate = new Date(req.body.fromDate);
        const toDate = new Date(req.body.toDate);

        fromDate.setHours(0);
        fromDate.setMinutes(0);
        fromDate.setSeconds(0);
        fromDate.setMilliseconds(0);


        toDate.setHours(0);
        toDate.setMinutes(0);
        toDate.setMilliseconds(0);
        toDate.setMilliseconds(0);


        const todaysDate = new Date();
        todaysDate.setHours(0);
        todaysDate.setMinutes(0);
        todaysDate.setSeconds(0);
        todaysDate.setMilliseconds(0);

        if (!allowedServices.includes(serviceType)) {
            res.status(400).send({ message: "Bad Request" })
            return
        }
        //check if dates are valid
        if (fromDate >= toDate) {
            res.status(400).send({ message: "Fromdate cant be greater than or equal to todate" })
            return

        }

        if (fromDate < todaysDate) {
            res.status(400).send({ message: "Fromdate cant be less than todays date" })
            return
        }

        //check if serviceId exists
        const serviceModel = MODELS[serviceType].model
        var service = await serviceModel.findOne({ _id: serviceId })
        if (!service) {
            res.status(400).send({ message: "Invalid Service Id" })
            return

        }

        //check if the service is already being promoted
        if (service.promotion.status == "true") {
            res.status(400).send({ message: "Already being promoted" })
            return
        }

        //calculate the price
        const timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());

        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        const totalPrice = PROMOTION_COST_PER_DAY * daysDiff * 100


        //generate an order
        var userId = req.authInfo._id// '6446c1f4184116859686b24f'
        var result //= await createOrder(userId, totalPrice)

        if (paymentPlatform == 'rzp') {
            result = await createOrder(userId, totalPrice)
        } else if (paymentPlatform == 'stripe') {
            result = await createOrder(userId, totalPrice, 'stripe')

        }



        result['type'] = "promotion"
        result["promotionData"] = { serviceId, serviceType, fromDate, toDate }
        var order = {
            rzpId: result.orderId,
            stripeId: result.clientSecret,

            otherData: result
        }

        var data = await MODELS["orders"].model.create(order)

        order.otherData.orderId = data._id
        // var data = { msg: 'hi', fromDate: fromDate, todaysDate: todaysDate, days: daysDiff, userId: req.authInfo._id }
        res.send(order)

    } catch (error) {
        console.log(error.message, 'message')
        res.send(error)
    }


}

export default postUserServicePromote