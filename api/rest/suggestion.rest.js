import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/suggestion",
        type: "get",
        collection: "suggestion",
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

                // { $unset: ["__v", "mOn", "description.draft"] }

            ]

        },
        customFunction: true,
        response: {}
    },
    // {
    //     path: "/suggestion",
    //     type: "post",
    //     collection: "rooms",
    //     authEnabled: true,
    //     allowedBody: {
    //         default: ['userId', "original"],
    //         role1: [],
    //         role2: []
    //     },
    //     customFunction: true,
    //     response: {}
    // },
]

export default routes