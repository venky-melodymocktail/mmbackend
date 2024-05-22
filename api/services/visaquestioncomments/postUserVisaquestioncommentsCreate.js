var defaultCollection = "visaquestioncomments"
var defaultModel = MODELS[defaultCollection].model


const postUserVisaquestioncommentsCreate = async (req, res) => {
    
    try {
        req.body['status'] = 'active'
        req.body['reportCount'] = 0
        var data = await MODELS["visaqandas"].model.update({"_id":req.body.visaQuestionID}, { $inc: { "commentCount": 1} })
        var data = await defaultModel.create(req.body)
        res.send(data)

    } catch (error) {
        res.send(error)
    }

    
}

export default postUserVisaquestioncommentsCreate