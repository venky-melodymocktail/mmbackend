var defaultCollection = "bookmarks"
var defaultModel = MODELS[defaultCollection].model


const postUserBookmarksCreate = async (req, res) => {

    try {
        var bookmark = await defaultModel.find({

            "$and": [{ userId: req.body.userId }, { bookmarkedObjectId: req.body.bookmarkedObjectId }]

        })

        if (bookmark.length > 0) {
            // console.log(req.body, 'body')
            var data = await defaultModel.deleteOne({ userId: req.body.userId, bookmarkedObjectId: req.body.bookmarkedObjectId })

            res.send({ "message": "Removed Bookmark" })
        }
        else {
            if (req.body.serviceType == 'visaqandas') {
                var data = await MODELS["visaqandas"].model.update({ "_id": req.body.bookmarkedObjectId }, { $inc: { "bookmarkCount": 1 } })
            }
            var data = await defaultModel.create(req.body)


            res.send(data)
        }



    } catch (error) {
        res.send(error)
    }


}

export default postUserBookmarksCreate