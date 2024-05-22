var defaultCollection = "report"
var defaultModel = MODELS[defaultCollection].model


const getAdminNeedaroom = async (req, res) => {
    
    try {
        var limit  = Number(req.query.limit)
        var skip = Number((req.query.page-1)*(req.query.limit))
        var data = null
        var reportedId = req.query.reportedId

            data = await defaultModel.aggregate([
                
                {
                    '$match': { 'reportedId': reportedId }
                     
                  }, 
                  {
                    '$sort': {
                        'cOn':-1
                    }
                },
                {
                    '$skip': skip 
                  },
                {
                    '$limit':limit 
                },
                
            ])
            

        
        let totalCount = await defaultModel.countDocuments({})
        
        res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":data})
        

    } catch (error) {
        res.send(error)
    }

    
}

export default getAdminNeedaroom