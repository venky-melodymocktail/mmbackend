// import { exec } from 'child_process'

var defaultCollection = "users"
var defaultModel = MODELS[defaultCollection].model

const getAdminUsers = async (req, res) => {
    try {

        var pipeline = {}
        // var query
        var result = await defaultModel.find({}).skip((req.query.page-1)*(req.query.limit)).limit(req.query.limit).sort({"cOn":-1})
        // let totalCount = await defaultModel.count()
        let totalCount = await defaultModel.countDocuments({})
        // res.send(result)
        // res.send({"totalCount":totalCount, "result":result})
        res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":result})
        
    } catch (error) {
        res.send(error)
    }
}
export default getAdminUsers