// import { exec } from 'child_process'

var defaultCollection = "users"
var defaultModel = MODELS[defaultCollection].model

const postUserUpdate = async (req, res) => {
    var obj = {}

    for (const item in req.body) {
        obj[item] = req.body[item]
    }

    try {
        // if (typeof (req.body.address) != 'object') {
        //     // res.send('bad request')
        //     // return;
        //     throw new Error('Bad Request')
        // }
        var data = await defaultModel.updateMany({ "_id": req.body.userId }, { $set: obj })
        res.send(data)
    }
    catch (err) {
        res.send({ "error": err.message })
    }

}
export default postUserUpdate