var defaultCollection = "home"
var defaultModel = MODELS[defaultCollection].model


const postUserHomeCreate = async (req, res) => {
    
    try {
        // req.body['postedBy'] = req.body.userId
        // req.body['country'] = "USA"
        req.body["promotion"] = {
            "status": false,
            "promotionFrom": "",
            "promotionTo": ""
        }
        var zipcodeinfo = await MODELS["zipcodes"].model.find({zip:req.body.zipCode})
        // // var toobj = await MODELS["zipcodes"].model.find({zip:req.body.to})

        if(req.body.amenities==""){
            req.body.amenities = []
        }

        req.body.zipCode = {
            city:zipcodeinfo[0].city,
            state:zipcodeinfo[0].state_name,
            zipcode:zipcodeinfo[0].zip,
            location:{ type: 'Point', coordinates:[Number(zipcodeinfo[0].lng), Number(zipcodeinfo[0].lat)]}
        }

        req.body["status"] = "active"
        // req.body["to"] = {
        //     city:toobj[0].city,
        //     state:toobj[0].state_name,
        //     zipcode:toobj[0].zip,
        //     location:{ type: 'Point', coordinates:[Number(toobj[0].lng), Number(toobj[0].lat)]}
        // }
        var data = await defaultModel.create(req.body)
        res.send(data)
    } catch (error) {
        res.send(error)
    }
    
}

export default postUserHomeCreate