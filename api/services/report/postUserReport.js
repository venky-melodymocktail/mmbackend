var defaultCollection = "report"
var defaultModel = MODELS[defaultCollection].model


const postUserBookmarksCreate = async (req, res) => {
    
    try {
        
        req.body['reportedBy'] = req.body.userId
        if(req.body.reportType=='visaqandas'){
            var data = await MODELS["visaqandas"].model.update({"_id":req.body.reportedObjectId}, { $inc: { "reportCount": 1} })
        }

        if(req.body.reportType=='visaquestioncomments'){
            var data = await MODELS["visaquestioncomments"].model.update({"_id":req.body.reportedObjectId}, { $inc: { "reportCount": 1} })
        }

        var data = await defaultModel.create(req.body)
        res.send(data)

    } catch (error) {
        res.send(error)
    }

    
}

export default postUserBookmarksCreate