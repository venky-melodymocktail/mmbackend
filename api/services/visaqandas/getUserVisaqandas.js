var defaultCollection = "visaqandas"
var defaultModel = MODELS[defaultCollection].model


const getUserBlogs = async (req, res) => {

    try {
        var userId = req.query.userId
        if (!userId) {
            userId = 'test'
        }
        var limit = Number(req.query.limit)

        var skip = Number((req.query.page - 1) * (req.query.limit))

        // var search = req.query.search;
        var operations = [{
            status: { $ne: "inactive" }
        }]
        var result = null

        // if (search) {
        //     operations.push(
        //         {
        //             "$or":[
        //                 { title:{$regex:search, $options: 'i'}},
        //                 { description:{$regex:search, $options: 'i'}}
        //             ]
        //         }

        //     )
        // }

        if (req.query.category) {
            operations.push(
                { category: req.query.category }
            )
        }
        else {
            operations.push(
                {}
            )
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
                    cOn: -1
                }
            }
        ]


        // var result = await defaultModel.find({"title":".*"+search+".*"}); 

        // result = await defaultModel.find({

        //     "$and": operations,

        // }).skip((req.query.page - 1) * (req.query.limit)).limit(req.query.limit).sort({
        //     // "bookmarkCount": -1,
        //     "cOn": -1
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
        let totalCount = await defaultModel.find({

            "$and": operations,

        })
        totalCount = totalCount.length
        // res.send(result)
        // res.send({"totalCount":totalCount, "result":result})
        res.send({ "totalPage": Math.ceil(totalCount / req.query.limit), "result": result })

    } catch (error) {
        res.send(error)
    }

}

export default getUserBlogs