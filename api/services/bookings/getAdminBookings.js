
var defaultCollection = "bookings"
var defaultModel = MODELS[defaultCollection].model

const getAdminUsers = async (req, res) => {
    try {
        // var category = req.query.category
        var limit = req.query.limit ? Number(req.query.limit) : 6
        var page = req.query.page ? Number(req.query.page) : 1
        var skip = (page-1)*limit
        var userId = req.query.userId

        var operations = []

        if (req.query.category) {
            operations.push(
                { category: req.query.category }
            )
        }

        // if (req.query.destination) {
        //     operations.push(
        //         { destination: req.query.destination }
        //     )
        // }



        // var data = await defaultModel.find({
        //     "$and":operations,
        // }).skip(skip).limit(limit).sort({ "cOn":-1})


        var data = await defaultModel.aggregate([
            {
                '$match': {
                  'category': req.query.category
                }
              },
            {
                '$set': {
                  'userId': {
                    '$toObjectId': '$userId'
                  }, 
                  'expertId': {
                    '$toObjectId': '$expertId'
                  }
                }
              }, {
                '$lookup': {
                  'from': 'users', 
                  'localField': 'userId', 
                  'foreignField': '_id', 
                  'as': 'userDetail'
                }
              }, {
                '$lookup': {
                  'from': 'experts', 
                  'localField': 'expertId', 
                  'foreignField': '_id', 
                  'as': 'expertDetail'
                }
              }, {
                '$unwind': {
                  'path': '$userDetail'
                }
              }, {
                '$unwind': {
                  'path': '$expertDetail'
                }
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
            }
           
            
        ])
        

        let totalCount = await defaultModel.find({
            
            "$and":operations,

        }).count()

        res.send({"totalPage":Math.ceil(totalCount/limit), "result":data})
        
    } catch (error) {
        res.send(error)
    }
}
export default getAdminUsers