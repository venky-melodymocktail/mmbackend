var defaultCollection = "blogs"
var defaultModel = MODELS[defaultCollection].model


const postAdminBlogsUpdate = async (req, res) => {

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
        res.send({ message: 'success' })

        // var data = await defaultModel.updateMany(
        //     {"_id":req.body.id}, 
        //     {
        //         $set:
        //         {
        //             "blogType":req.body.blogType,
        //             "title":req.body.title,
        //             "images":req.body.images,
        //             "travelType":req.body.travelType,
        //             "description":req.body.description,
        //             "destination":req.body.destination,
        //             "status":req.body.status

        //         }
        //     } 
        // )
        // res.send(data)

    } catch (error) {
        res.send(error)
    }

}

export default postAdminBlogsUpdate