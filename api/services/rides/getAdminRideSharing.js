var defaultCollection = "rides"
var defaultModel = MODELS[defaultCollection].model


const getAdminRideSharing = async (req, res) => {
    
    try {
        var zipcode = req.query.zipcode;
        var limit  = Number(req.query.limit)
        var totalCount = await defaultModel.find({adType:'offered'}).count()
        var skip = Number((req.query.page-1)*(req.query.limit))
        var spotAvailable = Number(req.query.spotAvailable)
        var data = null
        // var minspotAvailable = Number(req.query.minspotAvailable) || 0
        // var maxspotAvailable = Number(req.query.maxspotAvailable) || Number.POSITIVE_INFINITY
        // var minprice = Number(req.query.minPrice) || 0
        // var maxprice = Number(req.query.maxPrice) || Number.POSITIVE_INFINITY
        // var range = 0
        // if(req.query.range == "des"){
        //     range = -1
        // }
        // else if(req.query.range == "asc"){
        //     range = 1
        // }


        // aggregateOperation
        if (zipcode) {
            // var zipcodeInfo = await MODELS["zipcodes"].model.find({zip:zipcode})
            // var location = { type: 'Point', coordinates:[Number(zipcodeInfo[0].lng), Number(zipcodeInfo[0].lat)]}
            
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
                  '$match': {
                    'adType': 'offered'
                  }
                },
              {
                  '$sort': {
                    'cOn':-1,
                  }
              }, 
                // {
                //     '$sort': {
                //     'promotion.status': -1,
                //     'distance': 1,
                //     'cOn':-1,
                //     'price': range,
                //     }
                // },
                // {
                //     '$project': {
                //       '_id': '$_id', 
                //       'from': '$from', 
                //       'to': '$to', 
                //       'price': {
                //         '$toInt': '$price'
                //       }, 
                //       'dateOfJourney': '$dateOfJourney', 
                //       'adType': '$adType', 
                //       'spotAvailable': '$spotAvailable', 
                //       'city': '$city', 
                //       'state': '$state', 
                //       'zipcode': '$zipcode', 
                //       'cOn': '$cOn', 
                //       'mOn': '$mOn', 
                //       'promotion': '$promotion', 
                //       'distance': '$distance',
                //       'status':'$status'
                //     }
                //   }, {
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
                //           },
                //           {
                //             'adType': 'offered'
                //           }
                //       ]
                //     }
                //   }, 
                //   {
                //     '$sort': {
                      
                //     }
                //   },
                //   {
                //     '$match': {
                //       '$and': [
                        
                //       ]
                //     }
                //   },
                // {
                //     '$match': {
                //         'spotAvailable': spotAvailable
                //     }
                // },
                // {
                //     '$match': {
                //         'price': req.query.price
                //     }
                // },
                {
                    '$skip': skip
                  },
                {
                    '$limit':limit
                },
                
            ])
        }

        // var data = await defaultModel.aggregate([
        //     {
        //         '$match': {
        //             'spotAvailable': spotAvailable
        //         }
        //     },
        //     {
        //         '$match': {
        //             'price': req.query.price
        //         }
        //     },
        //     {
        //         '$skip': skip
        //       },
        //     {
        //         '$limit':limit
        //     },
        // ])
        
        res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":data})
        // res.send(data)

    } catch (error) {
        res.send(error)
    }

    
}

export default getAdminRideSharing