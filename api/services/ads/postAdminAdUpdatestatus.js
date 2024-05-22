var defaultCollection = "ads"
var defaultModel = MODELS[defaultCollection].model


const postAdUpdatestatus = async (req, res) => {

    try {
        var obj = {}

        console.log(req.body)


        if ((!req.body.status) || (!req.body.id)) {
            res.status(400).send({ message: "Bad Request" })
            return
        }

        let ad = await defaultModel.findOne({ _id: req.body.id })

        if (!ad) {
            res.status(400).send({ message: "Bad Request" })
            return
        }

        //get all ads with same adspaceid and disable all of them


        let adSpaceId = ad.adSpaceId
        await defaultModel.updateMany({ "adSpaceId": adSpaceId }, { $set: { status: "disabled" } })



        //activate the current ad
        await defaultModel.updateOne({ "_id": req.body.id }, { $set: { status: "active" } })


        //update the adId in the adspace
        let adspaceModel = MODELS["adSpaces"].model

        await adspaceModel.updateMany({ "_id": adSpaceId }, { $set: { adId: req.body.id } })

        res.send({ message: "Success" })
        // res.send(data)
    } catch (error) {
        res.send(error)
    }


}

export default postAdUpdatestatus