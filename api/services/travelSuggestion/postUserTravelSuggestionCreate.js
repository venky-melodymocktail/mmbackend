var defaultCollection = "travelSuggestion"
var defaultModel = MODELS[defaultCollection].model


const postUserTravelSuggestionCreate = async (req, res) => {
    // var body  = {name:'shivam'}
    // body["role"] = 'developer'
    // res.send(body)
    
    req.body["createdBy"] = req.body.userId
    var data = await defaultModel.create(req.body)
    
    res.send(data)
}

export default postUserTravelSuggestionCreate

