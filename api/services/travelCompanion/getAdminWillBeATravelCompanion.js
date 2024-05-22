var defaultCollection = "willBeATravelCompanion"
var defaultModel = MODELS[defaultCollection].model


const getAdminWillBeATravelCompanion = async (req, res) => {
    
    try {
        // var zipcode = req.query.zipcode;
        var limit  = Number(req.query.limit)
        // var totalCount = await defaultModel.find({}).toArray()
        var totalCount = await defaultModel.countDocuments()
        var skip = Number((req.query.page-1)*(req.query.limit))
        var data = null

        
        // if (zipcode) {
            // var zipcodeInfo = await MODELS["zipcodes"].model.find({zip:zipcode})

            // var location = { type: 'Point', coordinates:[Number(zipcodeInfo[0].lng), Number(zipcodeInfo[0].lat)]}
            // var totalCount = data.length
            data = await defaultModel.aggregate([
                // {
                //     '$geoNear': {
                //     'near': location, 
                //     'distanceField': 'distance', 
                //     'key': 'from.location', 
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
                //     '$match': {'status':"active"}
                     
                //   },  
                {
                    '$skip': skip 
                  },
                {
                    '$limit':limit 
                },
                // {
                //   '$facet': {
                //     'result': [], 
                //     'count': [
                //       {
                //         '$count': 'totalCount'
                //       }
                //     ]
                //   }
                // }, {
                //   '$unwind': {
                //     'path': '$count'
                //   }
                // }

                
            ])
            
        // }

        res.send([
          {
            result:data, 
            count:{totalCount:totalCount}
          }
        ])
        
        // res.send(data)
        
        

    } catch (error) {
        res.send(error)
    }

    
}

export default getAdminWillBeATravelCompanion