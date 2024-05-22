var defaultCollection = "blogs"
var defaultModel = MODELS[defaultCollection].model


const postAdminBlogsCreate = async (req, res) => {
    // var user = data;

    // user = await defaultModel.create(user)

    // return user
    // res.send(req.body)
    // req.body['createdBy'] = req.body.userId
    try {
        req.body['createdBy'] = req.body.userId
        // var data = null
        if (req.body.blogType!="Travel & Adventure") {
            req.body.travelType = null
            req.body.destination = null
            // var data = await defaultModel.create(req.body)
            // res.send(req.body)
        }
        // else{
        //     // var data = await defaultModel.create(req.body)
        //     res.send(req.body)
        // }
        req.body.pinned = false
        var data = await defaultModel.create(req.body)
        res.send(req.body)
    } catch (error) {
        res.send(error)
    }
    
}

export default postAdminBlogsCreate