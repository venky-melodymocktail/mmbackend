var defaultCollection = "rides"
var defaultModel = MODELS[defaultCollection].model


const postUserRideSharingUpdate = async (req, res) => {

    try {
        // req.body['postedBy'] = req.body.userId
        // req.body['country'] = "USA"
        if(req.body.from){
            var fromobj = await MODELS["zipcodes"].model.find({zip:req.body.from})
            req.body["from"] = {
                city:fromobj[0].city,
                state:fromobj[0].state_name,
                zipcode:fromobj[0].zip,
                location:{ type: 'Point', coordinates:[Number(fromobj[0].lng), Number(fromobj[0].lat)]}
            }
        }


        if(req.body.to){
            var toobj = await MODELS["zipcodes"].model.find({zip:req.body.to})
            req.body["to"] = {
                city:toobj[0].city,
                state:toobj[0].state_name,
                zipcode:toobj[0].zip,
                location:{ type: 'Point', coordinates:[Number(toobj[0].lng), Number(toobj[0].lat)]}
            }
        }
        
        // var userName = await MODELS["users"].model.find({_id:req.body.userId})
        // req.body['postedBy'] = userName[0].name

        var obj = {}

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

    } catch (error) {
        res.send(error)
    }

}

export default postUserRideSharingUpdate