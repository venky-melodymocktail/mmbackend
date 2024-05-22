var defaultCollection = "visaqandas"
var defaultModel = MODELS[defaultCollection].model


const getAdminBlogs = async (req, res) => {

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

        // if(req.query.category){
        //     operations.push(
        //         {category:req.query.category}
        //     )
        // }




        // var result = await defaultModel.find({"title":".*"+search+".*"}); 

        result = await defaultModel.find({

            "$and": operations,

        }).skip((req.query.page - 1) * (req.query.limit)).limit(req.query.limit).sort({
            // "bookmarkCount":-1,
            "cOn": -1
        })
        // let totalCount = await defaultModel.count()
        // let totalCount = await defaultModel.find({

        //     "$and":operations,

        // }).count()
        let totalCount = await defaultModel.countDocuments({})
        // res.send(result)
        // res.send({"totalCount":totalCount, "result":result})
        res.send({ "totalPage": Math.ceil(totalCount / req.query.limit), "result": result })

    } catch (error) {
        res.send(error)
    }

}

export default getAdminBlogs