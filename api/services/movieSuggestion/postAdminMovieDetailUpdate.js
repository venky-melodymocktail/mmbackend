var defaultCollection = "movieSuggestion"
var defaultModel = MODELS[defaultCollection].model


const postAdminMovieDetailUpdate = async (req, res) => {

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


    }
    catch (err) {
        res.send({ "error": err.message })
    }


}

export default postAdminMovieDetailUpdate