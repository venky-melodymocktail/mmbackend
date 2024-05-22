var defaultCollection = "visafaqs"
var defaultModel = MODELS[defaultCollection].model


const postAdminVisaFaqsCreate = async (req, res) => {
    
    try {
        req.body['createdBy'] = req.body.userId
        // req.body['status'] = "active"
        req.body.pinned = false
        var data = await defaultModel.create(req.body)
        res.send(req.body)
    } catch (error) {
        res.send(error)
    }
    
}

export default postAdminVisaFaqsCreate