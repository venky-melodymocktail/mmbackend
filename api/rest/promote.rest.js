import { ObjectId } from "mongodb"

var routes = [

    {
        path: "/user/service/promote",
        type: "post",
        collection: "orders",
        authEnabled: true,
        allowedBody: {
            default: ["serviceType", "serviceId", "fromDate", "toDate", "paymentPlatform"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/user/service/promote/paymentconfirmation",
        type: "post",
        collection: "orders",
        authEnabled: true,
        allowedBody: {
            default: ["orderId"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },



]

export default routes