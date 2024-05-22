
var defaultCollection = "orders"
var defaultModel = MODELS[defaultCollection].model


const postOrderUpdate = async (req, res) => {


    try {
        var orderId = req.body.orderId
        console.log(req.body, 'here')
        var type = req.body.type
        if (!type) {
            type = 'store'
        }

        // if (req.body.isSuccess) {

        // }

        // var data = await defaultModel.updateMany({ _id: orderId }, { $set: { status: 'success' } })
        console.log(defaultModel)

        var data = await defaultModel.updateMany({ "rzpId": orderId }, { $set: { "status": "success", type: type } })

        // console.log(data)
        res.send(data)

    } catch (error) {
        console.log(error)
        res.send(error)
    }


}

export default postOrderUpdate