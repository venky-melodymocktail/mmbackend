
var defaultCollection = "needARental"
var defaultModel = MODELS[defaultCollection].model


const getUserNeedarentalListing = async (req, res) => {
    try {
        var userId = req.query.userId

        // var zipcode = req.query.zipcode;
        var limit = Number(req.query.limit)
        var totalCount = 0;//await defaultModel.find({ status: "active" }).count()
        var skip = Number((req.query.page - 1) * (req.query.limit))
        var data = null

        var sortObj = {
            
            'cOn': -1,
        }

        
        var filters = {
            status: "active",
            userId:userId
        }

        




        // aggregateOperation
        
            let pipeLine = [
                
                
                
                {
                    '$sort': sortObj
                },
                {
                    '$match': filters

                },

               


            ]
            data = await defaultModel.aggregate([...pipeLine, {
                '$skip': skip
            },
            {
                '$limit': limit
            },
            {
                '$unset': [
                  
                  '__v',
                  'mOn',
                  'email',
                  'contactNumber',
                  'userDetail'
                ]
              }
            ])
            totalCount = await defaultModel.aggregate(pipeLine)
            totalCount = totalCount.length

        
        res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":data})


    } catch (error) {
        res.send(error)
    }
}

export default getUserNeedarentalListing


