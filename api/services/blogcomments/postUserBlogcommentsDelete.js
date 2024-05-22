var defaultCollection = "blogcomments"
var defaultModel = MODELS[defaultCollection].model


const postUserBlogCommentsDelete = async (req, res) => {

    try {


        var data = await defaultModel.updateMany({ "_id": req.body.id }, { $set: { "status": "deleted" } })
        // req.body['status'] = 'active'
        // var data = await defaultModel.create(req.body)
        res.send(data)

    } catch (error) {
        res.send(error)
    }


}

export default postUserBlogCommentsDelete