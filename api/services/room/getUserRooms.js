var defaultCollection = "rooms"
var defaultModel = MODELS[defaultCollection].model


const getUserRooms = async (req, res) => {

    try {
        var userId = req.query.userId
        if (!userId) {
            userId = 'test'
        }
        var zipcode = req.query.zipcode;
        var limit = Number(req.query.limit)
        var totalCount = 0// await defaultModel.find({ status: "active" }).count()
        console.log(totalCount, 'totalcount')
        var skip = Number((req.query.page - 1) * (req.query.limit))
        var data = null

        // var type = req.query.type ||""
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
        if (req.query.attachedBath) {

            filters['attachedBath'] = req.query.attachedBath == 'Yes' ? true : false
        }
        if (req.query.preferedGender) {
            filters['preferedGender'] = req.query.preferedGender //preferedGender: 
        }
        if (req.query.priceMode) {
            filters['priceMode'] = req.query.priceMode
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

        var range = 0
        if (req.query.priceRange) {
            if (req.query.priceRange == 'asc') {
                range = 1
            }
            else if (req.query.priceRange == 'des') {
                range = -1
            }
            else {
                range = 0
            }
        }

        let sortObj = {
            'promotion.status': -1,
            'distance': 1,

            'cOn': -1,
        }
        if (range != 0) {
            sortObj = {
                'promotion.status': -1,

                preferedRent: range,

                'cOn': -1,


            }
        }
        console.log(sortObj)



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
                // {
                //     '$set': {
                //         'preferedRent': {
                //             '$toDouble': '$preferedRent'
                //         },

                //     }
                // },
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
                        // 'promotion.status': -1,
                        'distance': 1,
                        // 'cOn': -1,
                        // 'preferedRent': range,
                    }
                },
                {
                    '$match': filters

                },
                // {
                //     '$sort': {
                //         'preferedRent': range,

                //     }
                // },

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
                    '$addFields': {
                        isBookmarked: {
                            '$cond': {
                                if: { $gt: [{ $size: "$matchedBookmarks" }, 0] },
                                then: true,
                                else: false
                            }
                        }
                    }
                }


            ]
            // console.log(JSON.stringify(pipeLine), 'pipeline')
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
        // ress.send(data)
        // res.send({"totalPage":typeof(req.query.attachedBath), "result":data})


    } catch (error) {
        // console.log(error.message)
        res.send(error)
    }


}

export default getUserRooms