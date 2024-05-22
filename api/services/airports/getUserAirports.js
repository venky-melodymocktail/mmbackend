var defaultCollection = "airports"
var defaultModel = MODELS[defaultCollection].model


const getUserAirports = async (req, res) => {

    try {

        var search = req.query.search;
        var operations = [{}]
        // var result = null

        if (search) {
            if (search.length <= 3) {
                operations.push(
                    {
                        "$or": [
                            // { name: { $regex: search, $options: 'i' } },
                            {
                                iata_code
                                    : { $regex: search, $options: 'i' }
                            },

                        ]
                    }

                )
            } else {

                operations.push(
                    {
                        "$and": [
                            { name: { $regex: search, $options: 'i' } },
                            { iata_code: { $exists: true } },


                        ]
                    }

                )


            }
        }



        var documents = await defaultModel.find({

            "$and": operations,

        }).limit(6)


        // const userIds = documents.map(doc => doc.userId);
        // var userDetails = []
        // for(var i=0; i<userIds.length; i++){
        //     var userDetail = await MODELS["users"].model.find({ _id: userIds[i] })
        //     if(userDetail[0]!=null){
        //         userDetails.push(userDetail[0])
        //     }

        // }

        // result = documents.map(doc => {
        //     var userDetail = userDetails.find(user => user._id == doc.userId);

        //     if (userDetail) {
        //       return { ...doc, userDetail:[userDetail] };
        //     } else {

        //       return { ...doc, userDetail: [] }; 
        //     }
        // });

        // const updatedDocs = result.map(doc => {
        //     return {
        //       ...doc._doc,
        //       userDetail: doc.userDetail
        //     };
        //   });
        // // let totalCount = await defaultModel.count()
        // let totalCount = await defaultModel.find({

        //     "$and":operations,

        // }).count()

        res.send(documents)

    } catch (error) {
        res.send(error)
    }

}

export default getUserAirports