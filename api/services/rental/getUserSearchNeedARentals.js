var defaultCollection = "needARental"
var defaultModel = MODELS[defaultCollection].model


const getUserSearchRentals = async (req, res) => {

    try {

        var userId = req.query.userId
        if (!userId) {
            userId = 'test'
        }
        var search = req.query.search;
        var operations = [{}]
        var result = null
        var limit = Number(req.query.limit)
        var skip = Number((req.query.page - 1) * (req.query.limit))
        var totalCount = 0
        var data = null

        let sortObj = {
            'promotion.status': -1,

            'cOn': -1,
        }
        
        
        var filters = {
            '$or': [
                {
                    'zipCode.city': {
                        '$regex': search, 
                        '$options': 'i'
                    }
                }, {
                    'zipCode.state': {
                        '$regex': search, 
                        '$options': 'i'
                    }
                }, {
                    'title': {
                        '$regex': search, 
                        '$options': 'i'
                    }
                }, {
                    'zipCode.zipcode': {
                        '$regex': search, 
                        '$options': 'i'
                    }
                }
            ], 
            'status': 'active'
        }
        // console.log("here1")
        
        let pipeLine = [
                
                {
                    '$set': {
                        'userId': {
                            '$toObjectId': '$userId'
                        },
                        serviceId: { $toString: "$_id" }

                    }
                },
                {
                    '$set': {
                        'preferedRent': {
                            '$toDouble': '$preferedRent'
                        },

                    }
                },
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'userId',
                        'foreignField': '_id',
                        'as': 'userDetail'
                    }
                },
                {
                    '$sort': sortObj
                },
                {
                    '$match': filters

                },

                {
                    '$lookup': {
                        from: "bookmarks",

                        let: { userId: userId, bookmarkedObjectId: "$serviceId" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$userId", "$$userId"] },
                                            { $eq: ["$bookmarkedObjectId", "$$bookmarkedObjectId"] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "matchedBookmarks"

                    }
                },
                {
                    $addFields: {
                        isBookmarked: {
                            $cond: {
                                if: { $gt: [{ $size: "$matchedBookmarks" }, 0] },
                                then: true,
                                else: false
                            }
                        }
                    }
                }


            ]
            // console.log("here2")
            // res.send(pipeLine)
            // return
            data = await defaultModel.aggregate([
                ...pipeLine,
                {
                    '$skip': skip
                },
                {
                    '$limit': limit
                },
                {
                    '$sort': sortObj
                },
                {
                    '$unset': [
                      
                      '__v',
                      'mOn',
                      'email',
                      'contactNumber',
                      'userDetail'
                    ]
                  }

            ])

            
            totalCount = await defaultModel.aggregate(pipeLine)
            totalCount = totalCount.length

        
            res.send({ "totalPage": Math.ceil(totalCount / limit), "result": data })
        // res.send([
        //     {
        //         "result": data,
        //         "count": {
        //             "totalCount": Math.ceil(totalCount / limit)
        //         }
        //     }
        // ])


    } catch (error) {
        res.send(error)
    }

}

export default getUserSearchRentals