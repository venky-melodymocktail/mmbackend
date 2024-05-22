var defaultCollection = "visafaqs"
var defaultModel = MODELS[defaultCollection].model


const getUserBlogs = async (req, res) => {

    try {

        // var search = req.query.search;
        var operations = [{}]
        var result = null

        // if (search) {
        //     operations.push(
        //         {
        //             "$or":[
        //                 { title:{$regex:search, $options: 'i'}},
        //                 { description:{$regex:search, $options: 'i'}}
        //             ]
        //         }

        //     )
        // }

        if (req.query.category) {
            operations.push(
                { category: req.query.category }
            )
        }

        // if(req.query.category){

        // }

        operations.push(
            { status: "active" }
        )


        // var result = await defaultModel.find({"title":".*"+search+".*"}); 

        result = await defaultModel.find({

            "$and": operations,

        }).skip((req.query.page - 1) * (req.query.limit)).limit(req.query.limit).sort({
            //  "pinned":-1,
            "cOn": -1
        })
        // let totalCount = await defaultModel.count()
        let totalCount = await defaultModel.find({

            "$and": operations,

        }).count()
        // res.send(result)
        // res.send({"totalCount":totalCount, "result":result})
        res.send({ "totalPage": Math.ceil(totalCount / req.query.limit), "result": result })

    } catch (error) {
        res.send(error)
    }

}

export default getUserBlogs