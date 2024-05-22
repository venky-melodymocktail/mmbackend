var defaultCollection = "willBeATravelCompanion"
var defaultModel = MODELS[defaultCollection].model


const postUsertravelCompanionCreate = async (req, res) => {
    
    try {
        // req.body['postedBy'] = req.body.userId
        // req.body['country'] = "USA"
        req.body["promotion"] = {
            "status": false,
            "promotionFrom": "",
            "promotionTo": ""
        }
        // var fromzipcodeinfo = await MODELS["zipcodes"].model.find({zip:req.body.from})
        // var tozipcodeinfo = await MODELS["zipcodes"].model.find({zip:req.body.to})
        req.body.from["location"] = { type: 'Point', coordinates:[Number(req.body.from.lng), Number(req.body.from.lat)]}
        req.body.to["location"] = { type: 'Point', coordinates:[Number(req.body.to.lng), Number(req.body.to.lat)]}
        // req.body["from"] = {
        //     city:fromzipcodeinfo[0].city,
        //     state:fromzipcodeinfo[0].state_name,
        //     // country:fromzipcodeinfo[0].
        //     zipcode:fromzipcodeinfo[0].zip,
        //     location:{ type: 'Point', coordinates:[Number(fromzipcodeinfo[0].lng), Number(fromzipcodeinfo[0].lat)]}
        // }

        // req.body["to"] = {
        //     city:tozipcodeinfo[0].city,
        //     state:tozipcodeinfo[0].state_name,
        //     zipcode:tozipcodeinfo[0].zip,
        //     location:{ type: 'Point', coordinates:[Number(tozipcodeinfo[0].lng), Number(tozipcodeinfo[0].lat)]}
        // }

        req.body["status"] = "active"
        
        var data = await defaultModel.create(req.body)
        res.send(data)
    } catch (error) {
        res.send(error)
    }
    
}

export default postUsertravelCompanionCreate