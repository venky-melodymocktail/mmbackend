var defaultCollection = "blogcomments"
var defaultModel = MODELS[defaultCollection].model


const getAdminBlogs = async (req, res) => {

    try {
        var limit  = Number(req.query.limit)
        
        var skip = Number((req.query.page-1)*(req.query.limit))
        var blogId = req.query.blogId
        var data = await defaultModel.aggregate([
            { '$match': { 'blogId': blogId } },
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
        var totalCount = await defaultModel.find({'blogId': blogId}).count()
        res.send({ "totalPage": Math.ceil(totalCount / req.query.limit), "result": data })

    } catch (error) {
        res.send(error)
    }

}

export default getAdminBlogs