var defaultCollection = "needahome"
var defaultModel = MODELS[defaultCollection].model


const getUserHomes = async (req, res) => {
    
    try {
        // var type = req.query.rideType
        var userId = req.query.userId

        var data = await defaultModel.find({
            "$and":[
                // {}
                {userId:userId},
                {status:"active"}
            ]
        }).skip((req.query.page-1)*(req.query.limit)).limit(req.query.limit).sort({"cOn":-1})

        var totalCount = await defaultModel.find({
            
            "$and":[
                // {}
                {userId:userId},
                {status:"active"}
            ]

        }).count()

        // res.send(totalCount)
        res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":data})
        

    } catch (error) {
        res.send(error)
    }

    
}

export default getUserHomes