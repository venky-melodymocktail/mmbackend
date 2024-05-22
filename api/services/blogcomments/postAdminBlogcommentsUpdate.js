var defaultCollection = "blogcomments"
var defaultModel = MODELS[defaultCollection].model


const postAdminBlogcommentsUpdate = async (req, res) => {
    // var user = data;

    // user = await defaultModel.create(user)

    // return user
    // res.send(req.body)
    try {
        // req.body['status'] = 'active'
        // var data = await defaultModel.create(req.body)
        var data = await defaultModel.updateMany({ "_id": req.body.id }, { $set: { "status": req.body.status } })
        // var data = await defaultModel.updateMany({"_id":req.body._id}, {$set:{"status":req.body.status}} )
        res.send(data)

    } catch (error) {
        res.send(error)
    }

    // var data = await defaultModel.create(req.body)
    // res.send(data)
}

export default postAdminBlogcommentsUpdate