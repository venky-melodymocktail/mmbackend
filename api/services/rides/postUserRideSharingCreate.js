var defaultCollection = "rides"
var defaultModel = MODELS[defaultCollection].model


const postUserRideSharingCreate = async (req, res) => {
    
    try {
        // req.body['postedBy'] = req.body.userId
        // req.body['country'] = "USA"
        
        var fromobj = await MODELS["zipcodes"].model.find({zip:req.body.from})
        var toobj = await MODELS["zipcodes"].model.find({zip:req.body.to})
        
        req.body["from"] = {
            city:fromobj[0].city,
            state:fromobj[0].state_name,
            zipcode:fromobj[0].zip,
            location:{ type: 'Point', coordinates:[Number(fromobj[0].lng), Number(fromobj[0].lat)]}
        }

        req.body["to"] = {
            city:toobj[0].city,
            state:toobj[0].state_name,
            zipcode:toobj[0].zip,
            location:{ type: 'Point', coordinates:[Number(toobj[0].lng), Number(toobj[0].lat)]}
        }
        req.body["status"] = "active"
        var userName = await MODELS["users"].model.find({_id:req.body.userId})
        req.body['postedBy'] = userName[0].name
        req.body["promotion"] = {
            "status": false,
            "promotionFrom": "",
            "promotionTo": ""
        }
        req.body["userId"] = req.body.userId
        var data = await defaultModel.create(req.body)
        res.send(data)
    } catch (error) {
        res.send(error)
    }
    
}

export default postUserRideSharingCreate