var defaultCollection = "rental"
var defaultModel = MODELS[defaultCollection].model


const getUserRentalListings = async (req, res) => {

    try {
        var userId = req.query.userId
        if (!userId) {
            userId = 'test'
        }
        var limit = Number(req.query.limit)
        var totalCount = 0// await defaultModel.find({ status: "active" }).count()
        console.log(totalCount, 'totalcount')
        var skip = Number((req.query.page - 1) * (req.query.limit))
        var data = null


        let sortObj = {
            'cOn': -1,
        }

        



        // var type = req.query.type ||""
        var filters = {
            status: "active",
            userId:userId
        }

        
     
        
        
            let pipeLine = [
                
                
                {
                    '$set': {
                        'preferedRent': {
                            '$toDouble': '$preferedRent'
                        },

                    }
                },
                
                {
                    '$sort': sortObj
                },
                {
                    '$match': filters

                },

            ]
            data = await defaultModel.aggregate([
                ...pipeLine,
                {
                    '$skip': skip
                },
                {
                    '$limit': limit
                },
                {
                    '$sort': sortObj
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

        

        console.log(sortObj)

        
        res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":data})
        // res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":data})
        // ress.send(data)
        // res.send({"totalPage":typeof(req.query.attachedBath), "result":data})


    } catch (error) {
        // console.log(error.message)
        res.send(error)
    }


}

export default getUserRentalListings