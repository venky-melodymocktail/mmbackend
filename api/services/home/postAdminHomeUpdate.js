var defaultCollection = "home"
var defaultModel = MODELS[defaultCollection].model


const postAdminHomeUpdate = async (req, res) => {

    try {

        var obj = {}

        for (const item in req.body) {
            if (item == "id") {
                null
            }
            else if (req.body[item] != null) {
                obj[item] = req.body[item]
            }
        }

        var data = await defaultModel.updateMany({ "_id": req.body.id }, { $set: obj })
        res.send(data)
        // res.send(data)
    } catch (error) {
        res.send(error)
    }

}

export default postAdminHomeUpdate