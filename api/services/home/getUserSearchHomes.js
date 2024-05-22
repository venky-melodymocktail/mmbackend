var defaultCollection = "home"
var defaultModel = MODELS[defaultCollection].model


const getUserSearchHomes = async (req, res) => {

    try {

        var search = req.query.search;
        var operations = [{}]
        var result = null

        if (search) {
            operations.push(
                {
                    "$or": [
                        { title: { $regex: search, $options: 'i' } },
                        { "zipCode.city": { $regex: search, $options: 'i' } },
                        { "zipCode.state": { $regex: search, $options: 'i' } },
                        // { description:{$regex:search, $options: 'i'}}
                    ]
                }

            )
        }

        // if(req.query.category){
        //     operations.push(
        //         {blogType:req.query.category}
        //     )
        // }

        // if(req.query.destination){
        //     operations.push(
        //         {destination:req.query.destination}
        //     )
        // } 

        // if(req.query.travelType){
        //     operations.push(
        //         {travelType:req.query.travelType}
        //     )
        // }


        // var result = await defaultModel.find({"title":".*"+search+".*"}); 

        var documents = await defaultModel.find({

            "$and": operations,

        }).skip((req.query.page - 1) * (req.query.limit)).limit(req.query.limit).sort({ "pinned": -1, "cOn": -1 })


        const userIds = documents.map(doc => doc.userId);
        var userDetails = []
        for (var i = 0; i < userIds.length; i++) {
            var userDetail = await MODELS["users"].model.find({ _id: userIds[i] })
            if (userDetail[0] != null) {
                userDetails.push(userDetail[0])
            }

        }

        result = documents.map(doc => {
            var userDetail = userDetails.find(user => user._id == doc.userId);

            if (userDetail) {
                return { ...doc, userDetail: [userDetail] };
            } else {

                return { ...doc, userDetail: [] };
            }
        });

        const updatedDocs = result.map(doc => {
            return {
                ...doc._doc,
                userDetail: doc.userDetail
            };
        });
        // let totalCount = await defaultModel.count()
        let totalCount = await defaultModel.find({

            "$and": operations,

        }).count()

        res.send({ "totalPage": Math.ceil(totalCount / req.query.limit), "result": updatedDocs })

    } catch (error) {
        res.send(error)
    }

}

export default getUserSearchHomes