// import { exec } from 'child_process'

var defaultCollection = "users"
var defaultModel = MODELS[defaultCollection].model

const postadminUsersUpdate = async (req, res) => {


    try {
        var data = null
        if (req.body.status) {
            data = await defaultModel.updateMany({ "_id": req.body.uid }, { $set: { 'status': req.body.status } })
        }
        // if(typeof(req.body.address)!='object'){
        //     // res.send('bad request')
        //     // return;
        //     throw new Error('Bad Request')
        // }
        // res.send("hello")
        // data = await defaultModel.updateMany({"_id":req.body.userId}, {$set:{'address':req.body.address}} )
        res.send(req.body)
    }
    catch (err) {
        res.send({ "error": err.message })
    }

}
export default postadminUsersUpdate