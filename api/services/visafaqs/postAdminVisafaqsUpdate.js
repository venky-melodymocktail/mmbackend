var defaultCollection = "visafaqs"
var defaultModel = MODELS[defaultCollection].model


const postAdminVisafaqsUpdate = async (req, res) => {

    try {

        var obj = {}
        for (const item in req.body) {

            if (item == "id") {

            }
            else if (req.body[item] != null) {
                obj[item] = req.body[item]
            }
        }
        var data = await defaultModel.updateMany({ "_id": req.body.id }, { $set: obj })
        res.send(data)


    }
    catch (err) {
        res.send({ "error": err.message })
    }

}

export default postAdminVisafaqsUpdate