var defaultCollection = "visaqandas"
var defaultModel = MODELS[defaultCollection].model


const getUserVisaqandasListing = async (req, res) => {
    
    try {
        // var type = req.query.rideType
        var userId = req.query.userId
        // var category = req.query.category

        var operation = [
            {createdBy:userId},
            {status:"active"},
        ]

        if(req.query.category.length>1){
            operation.push(
                {category:req.query.category}
            )

        }

        

        var data = await defaultModel.find({
            "$and":operation
        }).skip((req.query.page-1)*(req.query.limit)).limit(req.query.limit).sort({"cOn":-1})

        var totalCount = await defaultModel.find({
            
            "$and":operation

        }).count()

        // res.send(totalCount)
        res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":data})
        

    } catch (error) {
        res.send(error)
    }
    
}

export default getUserVisaqandasListing