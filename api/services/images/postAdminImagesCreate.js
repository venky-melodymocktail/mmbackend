var defaultCollection = "images"
var defaultModel = MODELS[defaultCollection].model


const postImagesCreate = async (req, res) => {

    try {

        var requiredFields = ['name', 'url']

        var isValid = true
        requiredFields.forEach(e => {
            if (!(e in req.body)) {
                isValid = false
            }
        })
        if (!isValid) {
            res.status(400).send({ message: "Bad Request" })
            return
        }

        var data = await defaultModel.create(req.body)
        res.send(data)

    } catch (error) {
        res.send(error)
    }


}

export default postImagesCreate