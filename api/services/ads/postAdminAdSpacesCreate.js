var defaultCollection = "adSpaces"
var defaultModel = MODELS[defaultCollection].model


const postAdSpacesCreate = async (req, res) => {

    try {



        var data = await defaultModel.create(req.body)
        res.send(data)

    } catch (error) {
        res.send(error)
    }


}

export default postAdSpacesCreate