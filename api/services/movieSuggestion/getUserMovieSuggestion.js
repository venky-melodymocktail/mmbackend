var defaultCollection = "movieSuggestion"
var defaultModel = MODELS[defaultCollection].model


const getUserMovieSuggestion = async (req, res) => {

    try {
        var userId = req.query.userId
        if (!userId) {
            userId = 'test'
        }

        var limit = Number(req.query.limit)
        if (!req.query.page) {
            req.query.page = 1
        }

        var skip = Number((req.query.page - 1) * (req.query.limit))




        var search = req.query.search
        // var Searchoperations = []
        var operations = [{ "status": "active" }]
        var result = []
        // res.send(search)
        if (req.query.search) {
            operations.push(
                {
                    "$or": [
                        { title: { $regex: search, $options: 'i' } },
                        { genre: { $regex: search, $options: 'i' } }
                    ]
                }

            )
        }

        if (req.query.type) {
            operations.push(
                { category: req.query.type }
            )
        }

        if (req.query.language) {
            operations.push(
                { language: req.query.language }
            )
        }

        if (req.query.genre) {
            operations.push(
                { genre: req.query.genre }
            )
        }

        if (req.query.ott) {

            operations.push(
                { availableOn: { "$in": [req.query.ott] } }
            )
        }


        console.log(operations, 'operations')
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
            {
                $sort: {
                    "cOn": -1
                }
            }


        ]


        // result = await defaultModel.find({

        //     ...query

        // }).skip((req.query.page - 1) * (req.query.limit)).limit(req.query.limit).sort({ "cOn": -1 })
        // result = await defaultModel.find({

        //     "$and":operations,

        // })

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
        ])



        // let totalCount = await defaultModel.count()
        // var totalCount = await defaultModel.find({

        //     ...query

        // }).count()

        let totalCount = await defaultModel.aggregate(pipeline)

        totalCount = totalCount.length

        console.log(operations, totalCount)
        res.send({ "totalpage": Math.ceil(totalCount / req.query.limit), "result": result })

    } catch (error) {
        // console.log(error.message)
        res.send(error)
    }





}

export default getUserMovieSuggestion