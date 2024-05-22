var defaultCollection = "expert"
var defaultModel = MODELS[defaultCollection].model


const getAdminExperts = async (req, res) => {
    
    try {

        // var search = req.query.search;
        // var Searchoperations = []
        var limit = req.query.limit ? Number(req.query.limit) : 6
        var page = req.query.page ? Number(req.query.page) : 1
        var skip = (page-1)*limit

        var filters = {
            
        }
        if(req.query.category){
            filters["category"] = req.query.category
        }
        
        // filters["status"] = "active"
        
        

        var data = await defaultModel.aggregate([
            {
                '$match': filters
              },
              
            {
                '$sort': {
                  'cOn': -1
                }
              },
              {
                '$skip': skip 
              },
            {
                '$limit':limit 
            }
        ])
        
        let totalCount = await defaultModel.find({
            
            "status":"active"

        }).count()

        // result = await defaultModel.find({})
        // // res.send(result)
        res.send({"totalPage":Math.ceil(totalCount/limit), "result":data})
        // res.send(data)

    } catch (error) {
        res.send(error)
    }
    
    // else{
    //     res.send([])
    // }
    // res.send(req.body)


    
}

export default getAdminExperts