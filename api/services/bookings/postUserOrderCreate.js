import { createOrder } from "../../../utils/neutrodev.js"

var defaultCollection = "orders"
var defaultModel = MODELS[defaultCollection].model


const postOrderCreate = async (req, res) => {


    try {
        var amount = 100

        if (req.body.amount) {
            amount = Number(req.body.amount)
        }
        amount = amount * 100
        console.log(amount, 'order')

        var userId = req.authInfo._id// '6446c1f4184116859686b24f'
        var result = await createOrder(userId, amount)
        var order = {
            rzpId: result.orderId,
            otherData: result
        }
        var data = await defaultModel.create(order)
        res.send(order)

    } catch (error) {
        res.send(error)
    }


}

export default postOrderCreate