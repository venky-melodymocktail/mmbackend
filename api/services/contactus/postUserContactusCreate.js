import { createMeeting, createOrder, sendEmail } from "../../../utils/neutrodev.js"

var defaultCollection = "contactus"
var defaultModel = MODELS[defaultCollection].model

var userModel = MODELS["users"].model

const postUserContactusCreate = async (req, res) => {

    try {


        req.body["userId"] = req.body.userId
        // console.log(req.body, 'body')

        let serviceName = req.body.serviceType;

        var user = await userModel.findOne({ _id: req.body.userId })
        let serviceModel = MODELS[serviceName].model;

        let serviceData = await serviceModel.findOne({ _id: req.body.serviceId })

        let toEmail = serviceData.email;
        console.log(serviceData, 'data')



        let emailData = {
            name: user.name,
            service: serviceName,
            serviceUrl: "",
            contactName: req.body.firstname + " " + req.body.lastname,
            contactPhone: req.body.phone,
            message: req.body.message,
            contactEmail: req.body.email
        }
        console.log(emailData, 'emaildata')
        sendEmail("alerts@melodymocktail.com", toEmail, 'Contact Requested for ' + serviceName, 'ContactRequest', emailData)
        var data = await defaultModel.create(req.body)

        res.send(data)

    } catch (error) {
        res.send(error)
    }


}

export default postUserContactusCreate