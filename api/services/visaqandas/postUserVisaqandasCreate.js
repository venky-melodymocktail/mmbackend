var defaultCollection = "visaqandas"
var defaultModel = MODELS[defaultCollection].model


const postUserVisaqandasCreate = async (req, res) => {
    try {
        req.body['createdBy'] = req.body.userId
        
        req.body['bookmarkCount']=0
        req.body['reportCount']=0
        req.body['commentCount']=0
        req.body['status'] = 'active'
        var data = await defaultModel.create(req.body)
        res.send(data)
    } catch (error) {
        res.send(error)
    }
    
}

export default postUserVisaqandasCreate