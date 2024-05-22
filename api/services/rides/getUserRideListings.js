var defaultCollection = "rides"
var defaultModel = MODELS[defaultCollection].model


const getAdminHaveARide = async (req, res) => {
    
    try {
        // req.query.zipcode
        // res.send(req.query.userId)
        var type = req.query.rideType
        var userId = req.query.userId

        var data = await defaultModel.find({
            "$and":[
                // {}
                {userId:userId},
                {adType:type},
                {status:"active"}
            ]
        }).skip((req.query.page-1)*(req.query.limit)).limit(req.query.limit).sort({"cOn":-1})

        var totalCount = await defaultModel.find({
            
            "$and":[
                // {}
                {userId:userId},
                {adType:type},
                {status:"active"}
            ]

        }).count()

        // res.send(totalCount)
        res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":data})

    } catch (error) {
        res.send(error)
    }

    
}

export default getAdminHaveARide