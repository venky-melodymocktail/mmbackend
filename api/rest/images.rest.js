import { ObjectId } from "mongodb"

var routes = [

    {
        path: "/admin/images",
        type: "get",
        collection: "images",
        authEnabled: true,
        allowedQueryParams: {
            default: [


            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                // { $match: { _id: ObjectId(data.variantId) } },

                { $unset: ["__v", "cOn", "mOn"] }

            ]

        },
        customFunction: false,
        response: {}
    },




    {
        path: "/admin/images/create",
        type: "post",
        collection: "images",
        authEnabled: true,
        allowedBody: {
            default: ['name', 'url'],
            role1: [],
            role2: []
        },
        customFunction: false,
        response: {}
    },



]

export default routes