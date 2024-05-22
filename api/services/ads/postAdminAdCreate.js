var defaultCollection = "ads"
var defaultModel = MODELS[defaultCollection].model


const postAdCreate = async (req, res) => {

    try {

        var requiredFields = ['name', 'adSpaceId', 'urls', 'redirectUrl']

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

        let newUrls = {};
        for (var key in req.body.urls) {
            newUrls[key] = req.body.urls[key].replace("https://melodymocktail.s3.ap-south-1.amazonaws.com/", "https://dgslk2men7iqd.cloudfront.net/")
        }
        req.body.urls = newUrls



        var data = await defaultModel.create(req.body)
        res.send(data)

    } catch (error) {
        res.send(error)
    }


}

export default postAdCreate