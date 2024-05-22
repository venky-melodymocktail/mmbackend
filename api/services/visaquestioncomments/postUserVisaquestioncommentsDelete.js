var defaultCollection = "visaquestioncomments"
var defaultModel = MODELS[defaultCollection].model


const postUserVisaquestioncommentsDelete = async (req, res) => {

    try {

        var visaqandasdetail = await defaultModel.find({ _id: req.body.visaQuestionCommentId })
        // res.send(visaqandasdetail)
        var data = await MODELS["visaqandas"].model.update({ "_id": visaqandasdetail[0].visaQuestionID }, { $inc: { "commentCount": -1 } })
        var data = await defaultModel.updateMany({ "_id": req.body.visaQuestionCommentId }, { $set: { "status": "deleted" } })
        res.send(data)

    } catch (error) {
        res.send(error)
    }


}

export default postUserVisaquestioncommentsDelete