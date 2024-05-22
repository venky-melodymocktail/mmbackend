
var defaultCollection = "bookings"
var defaultModel = MODELS[defaultCollection].model


const postAdminUpdateBooking = async (req, res) => {


    try {
        // var id = req.body.id
        // var expertId = req.body.expertId
        

        var data = await defaultModel.updateMany({ "_id": req.body.id }, { $set: { "expertId": req.body.expertId } })

        
        res.send(data)

    } catch (error) {
        console.log(error)
        res.send(error)
    }


}

export default postAdminUpdateBooking