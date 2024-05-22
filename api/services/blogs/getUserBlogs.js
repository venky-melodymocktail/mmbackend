var defaultCollection = "blogs"
var defaultModel = MODELS[defaultCollection].model


const getUserBlogs = async (req, res) => {

    try {
        var userId = req.query.userId
        if (!userId) {
            userId = '64d33e42271af22c64f72619'
        }
        console.log(req.query, 'blogget')
        if (!req.query.page) {
            req.query.page = 1
        }
        var limit = Number(req.query.limit)

        var skip = Number((req.query.page - 1) * (req.query.limit))

        let isPin = req.query.isPin


        var search = req.query.search;
        var operations = [{

            status: { $ne: "inactive" }

        }]
        var result = null

        if (search) {
            operations.push(
                {
                    "$or": [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } }
                    ]
                }

            )
        }

        if (req.query.category) {
            operations.push(
                { blogType: req.query.category }
            )
        }

        if (req.query.destination) {
            operations.push(
                { destination: req.query.destination }
            )
        }

        if (req.query.travelType) {
            operations.push(
                { travelType: req.query.travelType }
            )
        }
        console.log(JSON.stringify(operations), 'totalcount')


        // var result = await defaultModel.find({"title":".*"+search+".*"}); 
        let query = {}
        if (operations.length > 0) {
            query = {
                "$and": operations
            }

        }
        let pipeline = [
            {
                $match: {
                    "$and": operations
                }
            }, {
                $set: {
                    serviceId: { $toString: "$_id" }

                }
            },


        ]
        // result = await defaultModel.find({

        //     ...query

        // }).skip((req.query.page - 1) * (req.query.limit)).limit(req.query.limit).sort({ "pinned": -1, "cOn": -1 })
        if (isPin == 'true') {
            pipeline = [

                {
                    $match: {
                        "pinned": true
                    }
                }, {
                    $set: {
                        serviceId: { $toString: "$_id" }

                    }
                },
                

            ]
        }
        result = await defaultModel.aggregate([
            ...pipeline,
            {
                '$skip': skip
            },
            {
                '$limit': limit
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
                '$addFields': {
                    'isBookmarked': {
                        $cond: {
                            if: { $gt: [{ $size: "$matchedBookmarks" }, 0] },
                            then: true,
                            else: false
                        }
                    }
                }
            },
            {
                '$sort': {
                  'cOn': -1
                }
              }
        ])

        // let totalCount = await defaultModel.count()
        // let totalCount = await defaultModel.find({

        //     // "$and": operations,
        //     ...query

        // })
        let totalCount = await defaultModel.aggregate(pipeline)

        totalCount = totalCount.length

        for (var i = 0; i < result.length; i++) {
            delete result[i].description.draft
        }
        // res.send(result)
        // res.send({"totalCount":totalCount, "result":result})
        res.send({ "totalPage": Math.ceil(totalCount / req.query.limit), "result": result })

    } catch (error) {
        console.log(error)
        res.send(error)
    }

}

export default getUserBlogs