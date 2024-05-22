var defaultCollection = "visaquestioncomments"
var defaultModel = MODELS[defaultCollection].model


const postAdminVisaquestioncommentsUpdate = async (req, res) => {

    try {

        // var visaqandasdetail = await defaultModel.find({_id:req.body.visaQuestionCommentId})
        // res.send(visaqandasdetail)
        var data = await defaultModel.updateMany({ "_id": req.body.visaQuestionCommentId }, { $set: { "status": req.body.status } })
        res.send(data)

    } catch (error) {
        res.send(error)
    }


}

export default postAdminVisaquestioncommentsUpdate