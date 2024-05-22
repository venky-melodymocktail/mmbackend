var defaultCollection = "needahome"
var defaultModel = MODELS[defaultCollection].model


const getUserNeedAHomes = async (req, res) => {

    try {
        var userId = req.query.userId

        var zipcode = req.query.zipcode;
        var limit = Number(req.query.limit)
        var totalCount = 0//await defaultModel.find({ status: "active" }).count()
        var skip = Number((req.query.page - 1) * (req.query.limit))
        var data = null
        // var sortings = 
        var filters = {
            status: "active"
        }
        if (req.query.type) {
            filters["type"] = req.query.type
        }

        if (req.query.leaseType) {
            filters['stayLeaseType'] = req.query.leaseType
        }

        if (req.query.noOfPeople) {
            filters['noOfPeople'] = req.query.noOfPeople
        }
        if (req.query.amenities) {
            filters['amenities'] = { "$in": [req.query.amenities] }
        }
        if (req.query.smokingPolicy) {
            filters['smokingPolicy'] = req.query.smokingPolicy
        }
        if (req.query.petFriendly) {
            filters['petFriendly'] = req.query.petFriendly
        }


        // aggregateOperation
        if (zipcode) {
            var zipcodeInfo = await MODELS["zipcodes"].model.find({ zip: zipcode })
            var location = { type: 'Point', coordinates: [Number(zipcodeInfo[0].lng), Number(zipcodeInfo[0].lat)] }
            // var totalCount = data.length
            let pipeLine = [
                {
                    '$geoNear': {
                        'near': location,
                        'distanceField': 'distance',
                        'key': 'zipCode.location',
                        'spherical': true,
                        'distanceMultiplier': 0.001
                    }
                },
                {
                    '$set': {
                        'userId': {
                            '$toObjectId': '$userId'
                        },
                        serviceId: { $toString: "$_id" }

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
                    '$sort': {
                        'promotion.status': -1,
                        'distance': 1,
                        'cOn': -1,
                        // 'price': range,
                    }
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
            data = await defaultModel.aggregate([
                ...pipeLine,
                {
                    '$skip': skip
                },
                {
                    '$limit': limit
                },
                {
                    '$unset': [
                      
                      '__v',
                      'mOn',
                      'email',
                      'contactNumber'
                    ]
                  }
            ])
            totalCount = await defaultModel.aggregate(pipeLine)
            totalCount = totalCount.length

        }


        res.send([
            {
                "result": data,
                "count": {
                    "totalCount": totalCount
                }
            }
        ])
        // res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":data})


    } catch (error) {
        res.send(error)
    }


}

export default getUserNeedAHomes