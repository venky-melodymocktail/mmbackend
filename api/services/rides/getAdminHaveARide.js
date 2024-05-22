var defaultCollection = "rides"
var defaultModel = MODELS[defaultCollection].model


const getAdminHaveARide = async (req, res) => {
    
    try {
        var zipcode = req.query.zipcode;
        var limit  = Number(req.query.limit)
        var skip = Number((req.query.page-1)*(req.query.limit))
        var totalCount = await defaultModel.find({adType:'wanted'}).count()
        var spotAvailable = Number(req.query.spotAvailable)
        var data = null

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
                      'adType': 'wanted'
                    }
                  },
                {
                    '$sort': {
                        'cOn':-1,
                    // 'distance': 1 
                    }
                }, 
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
            // data = result
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
        // var totalCount = await defaultModel.find().count()
        // 
        // var totalCount = data.length
        res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":data})
        // res.send(data)

    } catch (error) {
        res.send(error)
    }

    
}

export default getAdminHaveARide