import { ObjectId } from "mongodb"

var routes = [

    {
        path: "/user/contactus/create",
        type: "post",
        collection: "contactus",
        authEnabled: true,
        allowedBody: {
            default: ['serviceType', 'serviceId', 'firstname', 'lastname', "phone", 'email', 'message', 'captcha', 'userId'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

]

export default routes