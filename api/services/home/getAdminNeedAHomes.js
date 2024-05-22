var defaultCollection = "needahome"
var defaultModel = MODELS[defaultCollection].model


const getAdminNeedAHomes = async (req, res) => {
    
    try {
        var zipcode = req.query.zipcode;
        var limit  = Number(req.query.limit)
        // var totalCount = await defaultModel.find({}).count()
        var skip = Number((req.query.page-1)*(req.query.limit))
        var data = null
        // var sortings = 
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
        // if(req.query.amenities){
        //     filters['amenities'] = {"$in":[req.query.amenities]}
        // }
        // if(req.query.smokingPolicy){
        //     filters['smokingPolicy'] = req.query.smokingPolicy
        // }
        // if(req.query.petFriendly){
        //     filters['petFriendly'] = req.query.petFriendly
        // }


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
                        'cOn':-1,
                        // 'price': range,
                        }
                },
                {
                    '$match': filters
                },
                // {
                //     '$match': {
                //       '$and': [
                //         {
                //           'price': {
                //             '$gte': minprice
                //           }
                //         }, {
                //           'price': {
                //             '$lte': maxprice
                //           }
                //         },
                //         {
                //             'spotAvailable': {
                //               '$gte': minspotAvailable
                //             }
                //           }, {
                //             'spotAvailable': {
                //               '$lte': maxspotAvailable
                //             }
                //           }
                //       ]
                //     }
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
        

    } catch (error) {
        res.send(error)
    }

    
}

export default getAdminNeedAHomes