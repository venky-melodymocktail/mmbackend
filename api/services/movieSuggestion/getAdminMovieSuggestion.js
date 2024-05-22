var defaultCollection = "movieSuggestion"
var defaultModel = MODELS[defaultCollection].model


const getAdminMovieSuggestion = async (req, res) => {

    try {

        var search = req.query.search;
        // var Searchoperations = []
        var operations = []
        var result = null

        if (search) {
            operations.push(
                {
                    "$or": [
                        { title: { $regex: search, $options: 'i' } },
                        { gener: { $regex: search, $options: 'i' } }
                    ]
                }

            )
        }

        if (req.query.type) {
            operations.push(
                { category: req.query.type }
            )
        }

        if (req.query.language) {
            operations.push(
                { language: req.query.language }
            )
        }

        if (req.query.gener) {
            operations.push(
                { gener: req.query.gener }
            )
        }

        if (req.query.ott) {

            operations.push(
                { availableOn: { "$in": [req.query.ott] } }
            )
        }




        result = await defaultModel.find({

            // "$and":operations,

        }).skip((req.query.page - 1) * (req.query.limit)).limit(req.query.limit).sort({ "cOn": -1 })
        let totalCount = await defaultModel.countDocuments({})
        // res.send(result)
        res.send({ "totalCount": Math.ceil(totalCount/req.query.limit), "result": result })

    } catch (error) {
        res.send(error)
    }

    // else{
    //     res.send([])
    // }
    // res.send(req.body)



}

export default getAdminMovieSuggestion