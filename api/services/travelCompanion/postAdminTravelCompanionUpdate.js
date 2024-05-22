var defaultCollection = "travelCompanion"
var defaultModel = MODELS[defaultCollection].model


const postAdminHomeUpdate = async (req, res) => {

    try {

        // var zipcodeinfo = await MODELS["zipcodes"].model.find({zip:req.body.zipCode})
        // // // var toobj = await MODELS["zipcodes"].model.find({zip:req.body.to})

        // req.body.zipCode = {
        //     city:zipcodeinfo[0].city,
        //     state:zipcodeinfo[0].state_name,
        //     zipcode:zipcodeinfo[0].zip,
        //     location:{ type: 'Point', coordinates:[Number(zipcodeinfo[0].lng), Number(zipcodeinfo[0].lat)]}
        // }

        var obj = {}

        for (const item in req.body) {
            if (item == "id") {
                null
            }
            else if (req.body[item] != null) {
                obj[item] = req.body[item]
            }
        }
        delete obj.userId
        var data = await defaultModel.updateMany({ "_id": req.body.id }, { $set: obj })
        res.send(data)
        // res.send(data)
    } catch (error) {
        res.send(error)
    }

}

export default postAdminHomeUpdate