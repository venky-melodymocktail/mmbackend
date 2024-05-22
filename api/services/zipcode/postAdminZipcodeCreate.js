var defaultCollection = "zipcodes"
var defaultModel = MODELS[defaultCollection].model


const postAdminZipcodeCreate = async (req, res) => {

    try {
        req.body["country"] = "USA"
        var data = await defaultModel.create(req.body)
        res.send(data)
    } catch (error) {
        res.send(error)
    }

}

export default postAdminZipcodeCreate