var defaultCollection = "needaroom"
var defaultModel = MODELS[defaultCollection].model


const postUserNeedARoomsUpdate = async (req, res) => {

    try {

        var obj = {}

        if(req.body.zipCode){
            var zipcodeinfo = await MODELS["zipcodes"].model.find({zip:req.body.zipCode})


            req.body.zipCode = {
                city:zipcodeinfo[0].city,
                state:zipcodeinfo[0].state_name,
                zipcode:zipcodeinfo[0].zip,
                location:{ type: 'Point', coordinates:[Number(zipcodeinfo[0].lng), Number(zipcodeinfo[0].lat)]}
            }
        }
        

        for (const item in req.body) {
            if (item == "id") {
                null
            }
            else if (req.body[item] != null) {
                obj[item] = req.body[item]
            }
        }

        var data = await defaultModel.updateMany({ "_id": req.body.id }, { $set: obj })
        res.send(data)
        // res.send(data)
    } catch (error) {
        res.send(error)
    }

}

export default postUserNeedARoomsUpdate