var defaultCollection = "expert"
var defaultModel = MODELS[defaultCollection].model


const postAdminExpertsCreate = async (req, res) => {
    

    try {
        req.body["bookingsCount"] = 0
        req.body["status"] = 'active'
        var data = await defaultModel.create(req.body)
        res.send(data)

    } catch (error) {
        res.send(error)
    }

    
}

export default postAdminExpertsCreate