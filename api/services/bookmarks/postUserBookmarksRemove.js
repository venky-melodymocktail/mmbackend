// import mongoD

var defaultCollection = "bookmarks"
var defaultModel = MODELS[defaultCollection].model


const postUserBookmarksRemove = async (req, res) => {

    try {

        // var bookmarkDetail = await defaultModel.find({_id:req.body.bookmarkId})
        var bookmarkId = req.body.bookmarkId

        // if(bookmarkDetail[0].serviceType=='visaqandas'){

        //     var data = await MODELS["visaqandas"].model.update({"_id":bookmarkDetail[0].bookmarkedObjectId}, { $inc: { "bookmarkCount": -1} })
        // }
        var data = await defaultModel.deleteOne({ "_id": bookmarkId })
        // var data = await defaultModel.deleteOne({"_id":req.body.bookmarkId})

        res.send(data)

    } catch (error) {
        res.send(error)
    }


}

export default postUserBookmarksRemove