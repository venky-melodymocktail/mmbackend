var defaultCollection = "visaquestioncomments"
var defaultModel = MODELS[defaultCollection].model


const getAdminvisaquestioncomment = async (req, res) => {

    try {
        var limit  = Number(req.query.limit)
        
        var skip = Number((req.query.page-1)*(req.query.limit))
        var visaQuestionID = req.query.visaQuestionID
        var data = await defaultModel.aggregate([
            { '$match': { 'visaQuestionID': visaQuestionID } },
            {
                '$set': {
                  'userId': {
                    '$toObjectId': '$userId'
                  }
                }
              }, {
                '$lookup': {
                  'from': 'users', 
                  'localField': 'userId', 
                  'foreignField': '_id', 
                  'as': 'user'
                }
              }, {
                '$unwind': {
                  'path': '$user'
                }
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
            },
        ])


        // var result = await defaultModel.find({"title":".*"+search+".*"}); 

        
        // let totalCount = await defaultModel.countDocuments({})
        var totalCount = await defaultModel.find({'visaQuestionID': visaQuestionID}).count()
        res.send({ "totalPage": Math.ceil(totalCount / req.query.limit), "result": data })

    } catch (error) {
        res.send(error)
    }

}

export default getAdminvisaquestioncomment