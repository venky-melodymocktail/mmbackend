var defaultCollection = "zipcodes"
var defaultModel = MODELS[defaultCollection].model


const getUserZipcodeSearch = async (req, res) => {

    try {

        var search = req.query.search;
        var operations = []
        var result = null
        var limit = Number(req.query.limit) || 10

        var filters = {
            '$or': [
                {
                    'zip': {
                        '$regex': search, 
                        '$options': 'i'
                    }
                }, {
                    'city': {
                        '$regex': search, 
                        '$options': 'i'
                    }
                }, {
                    'state_name': {
                        '$regex': search, 
                        '$options': 'i'
                    }
                }, 
            ], 
        }


        if (search) {
            // const regexPattern = new RegExp('^' + search, 'i');

            // operations.push(
            //     { zip: regexPattern }
            //     // { zip:{$regex:search, $options: 'i'}}

            // )
        


            result = await defaultModel.aggregate(
                [
                    {
                        '$match': filters
                    },
                    {
                        '$limit': limit
                    },
                ]
            )
        }


        // result = await defaultModel.find({

        //     "$and": operations,

        // }).limit("5")
        // let totalCount = await defaultModel.count()
        // let totalCount = await defaultModel.find({

        //     "$and":operations,

        // }).count()
        // res.send(result)
        // res.send({"totalCount":totalCount, "result":result})
        res.send(result)

    } catch (error) {
        res.send(error)
    }

}

export default getUserZipcodeSearch