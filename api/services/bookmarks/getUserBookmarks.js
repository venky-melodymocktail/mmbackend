var defaultCollection = "bookmarks"
var defaultModel = MODELS[defaultCollection].model


const getUserBookmarks = async (req, res) => {
    
    try {  
        var serViceType = req.query.serviceType
        var limit = req.query.limit ? Number(req.query.limit) : 6
        var page = req.query.page ? Number(req.query.page) : 1
        var skip = (page-1)*limit
        var userId = req.query.userId
        // res.send(req.Query.userId)
        var data = []

        if(serViceType == "visaqandas" || "blogs" || "moviesuggestions"){
            data = await defaultModel.aggregate([
              {
                '$match': {
                    'userId': userId
                }
            },
              {
                  '$match': {
                    'serviceType': serViceType,
                  }
                },

                {
                  '$set': {
                    'bookmarkedObjectId': {
                      '$toObjectId': '$bookmarkedObjectId'
                    }
                  }
                },
              { '$lookup':
                  {
                    from: serViceType,
                    localField: "bookmarkedObjectId",
                    foreignField: "_id",
                    as: "details"
                  }
              },
              {
                  '$unwind': {
                    'path': '$details'
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
                // },  {
                //   '$unwind': '$count'
                // }
          ])
        }

        if(serViceType == "rooms" || "needarooms" || "homes" || "needahomes" || "rides" || "travelcompanions" || "willbeatravelcompanions" || "rental" || "needARental"){
          data = await defaultModel.aggregate([
            {
              '$match': {
                  'userId': userId
              }
          },  
            {
                  '$match': {
                    'serviceType': serViceType
                  }
                },
                {
                  '$set': {
                    'bookmarkedObjectId': {
                      '$toObjectId': '$bookmarkedObjectId'
                    }
                  }
                },
              { '$lookup':
                  {
                    from: serViceType,
                    localField: "bookmarkedObjectId",
                    foreignField: "_id",
                    as: "details"
                  }
              },
              {
                  '$unwind': {
                    'path': '$details'
                  }
                },
                {
                  '$set': {
                    'details.userId': {
                      '$toObjectId': '$details.userId'
                    }
                  }
                }, {
                  '$lookup': {
                    'from': 'users', 
                    'localField': 'details.userId', 
                    'foreignField': '_id', 
                    'as': 'details.userDetail'
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
                // },  {
                //   '$unwind': '$count'
                // }

          ])
        }

        var totalCount = await defaultModel.find({ 'userId': userId, 'serviceType': serViceType }).count()
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

export default getUserBookmarks