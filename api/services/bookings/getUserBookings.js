
var defaultCollection = "bookings"
var defaultModel = MODELS[defaultCollection].model

const getAdminUsers = async (req, res) => {
  try {
    var category = req.query.category
    var limit = req.query.limit ? Number(req.query.limit) : 6
    var page = req.query.page ? Number(req.query.page) : 1
    var skip = ((page - 1) * (req.query.limit))
    var userId = req.query.userId
    var data = await defaultModel.aggregate([
      [
        {
          '$match': {
            'orderData.userId': userId
          }
        }, {
          '$match': {
            'category': category
          }
        }, {
          '$set': {
            'expertId': {
              '$toObjectId': '$expertId'
            },
            'joinLink': "$meetingDetails.join_url"
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
            'path': '$expertDetail'
          }
        },
        {
          '$unset': "meetingDetails"
        },
        {
          '$sort': {
            'cOn': -1,
          }
        },
        {
          '$skip': skip
        },
        {
          '$limit': limit
        },
        // {
        //   '$facet': {
        //     'result': [], 
        //     'count': [
        //       {
        //         '$count': 'totalCount'
        //       }
        //     ]
        //   }
        // }, {
        //   '$unwind': {
        //     'path': '$count'
        //   }
        // }
      ]
    ])

    var totalCount = await defaultModel.find({ 'orderData.userId': userId, 'category': category }).count()
    res.send([
      {
        "result": data,
        "count": {
          "totalCount": totalCount
        }
      }
    ])
    // res.send(data)

  } catch (error) {
    res.send(error)
  }
}
export default getAdminUsers