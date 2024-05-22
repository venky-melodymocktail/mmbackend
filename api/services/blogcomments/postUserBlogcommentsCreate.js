var defaultCollection = "blogcomments"
var defaultModel = MODELS[defaultCollection].model


const postUserBlogCommentsCreate = async (req, res) => {
    // var user = data;

    // user = await defaultModel.create(user)

    // return user
    // res.send(req.body)
    try {
        req.body['status'] = 'active'
        var data = await defaultModel.create(req.body)
        res.send(data)

    } catch (error) {
        res.send(error)
    }

    // var data = await defaultModel.create(req.body)
    // res.send(data)
}

export default postUserBlogCommentsCreate