var defaultCollection = "expert"
var defaultModel = MODELS[defaultCollection].model


const getUserExperts = async (req, res) => {
    
    try {

        // var search = req.query.search;
        // var Searchoperations = []

        var filters = {
            
        }
        if(req.query.category){
            filters["category"] = req.query.category
        }
        
        
        if(req.query.date){
            filters['slots'] = {
                  '$elemMatch': {
                    'date': req.query.date
                  }
                }  
        }
        if(req.query.time){
            filters['slots'] = {
                  '$elemMatch': {
                    'time': req.query.time
                  }
                }  
        }

        var data = await defaultModel.aggregate([
            {
                '$match': filters
              },
              
            {
                '$sort': {
                  'cOn': -1
                }
              }
        ])
        

        // result = await defaultModel.find({})
        // // res.send(result)
        res.send(data)

    } catch (error) {
        res.send(error)
    }
    
    // else{
    //     res.send([])
    // }
    // res.send(req.body)


    
}

export default getUserExperts