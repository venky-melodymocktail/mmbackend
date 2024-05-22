var defaultCollection = "needaroom"
var defaultModel = MODELS[defaultCollection].model


const getAdminNeedaroom = async (req, res) => {
    
    try {
        var zipcode = req.query.zipcode;
        var limit  = Number(req.query.limit)
        // var totalCount = await defaultModel.find({}).count()
        var skip = Number((req.query.page-1)*(req.query.limit))
        var data = null

        // var type = req.query.type ||""
        var filters = {
            
        }
        // if(req.query.type){
        //     filters["type"] = req.query.type
        // }
        
        // if(req.query.leaseType){
        //     filters['stayLeaseType'] = req.query.leaseType
        // }

        // if(req.query.noOfPeople){
        //     filters['noOfPeople'] = Number(req.query.noOfPeople)
        // }
        // if(req.query.attachedBath){

        //     filters['attachedBath'] = req.query.attachedBath
        // }
        // if(req.query.preferedGender){
        //     filters['preferedGender'] = req.query.preferedGender
        // }
        // // if(req.query.paymentTerm){
        // //     filters['preferredRent'] = req.query.paymentTerm
        // // }
        // if(req.query.amenities){
        //     filters['amenities'] = {"$in":[req.query.amenities]}
        // }
        // if(req.query.smokingPolicy){
        //     filters['smokingPolicy'] = req.query.smokingPolicy
        // }
        // if(req.query.petFriendly){
        //     filters['petFriendly'] = req.query.petFriendly
        // }
        // if(req.query.minprice){
        //     filters['preferredRent'] = {
        //         '$gte': minprice
        //       }
        // }
        // {
        // var leaseType = req.query.leaseType 
        // var noOfPeople = Number(req.query.noOfPeople) 
        // var amenities = req.query.amenities || ""
        // var smokingPolicy = req.query.smokingPolicy || ""
        // var petFriendly = req.query.petFriendly || ""
        // var priceNode = req.query.petFriendly
        // var sortings = 
        

        

        // aggregateOperation
        // if (zipcode) {
        //     var zipcodeInfo = await MODELS["zipcodes"].model.find({zip:zipcode})
        //     var location = { type: 'Point', coordinates:[Number(zipcodeInfo[0].lng), Number(zipcodeInfo[0].lat)]}
            // var totalCount = data.length
            data = await defaultModel.aggregate([
                // {
                //     '$geoNear': {
                //     'near': location, 
                //     'distanceField': 'distance', 
                //     'key': 'zipCode.location', 
                //     'spherical': true, 
                //     'distanceMultiplier': 0.001
                //     }
                // }, 
                {
                    '$set': {
                      'userId': {
                        '$toObjectId': '$userId'
                      }
                    }
                  },
                {
                    '$lookup': {
                      'from': 'users', 
                      'localField': 'userId', 
                      'foreignField': '_id', 
                      'as': 'userDetail'
                    }
                },
                {
                    '$sort': {
                        // 'promotion.status': -1,
                        // 'distance': 1,
                        'cOn':-1
                        // 'price': range,
                        }
                },
                // {
                //     '$match': filters
                     
                //   }, 
                {
                    '$skip': skip 
                  },
                {
                    '$limit':limit 
                },
                
            ])
            
        // }

        
        let totalCount = await defaultModel.countDocuments({})
        
        res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":data})
        // res.send({"totalPage":typeof(req.query.attachedBath), "result":data})
        

    } catch (error) {
        res.send(error)
    }

    
}

export default getAdminNeedaroom