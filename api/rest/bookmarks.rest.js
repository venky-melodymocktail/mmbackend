import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/user/bookmarks",
        type: "get",
        collection: "bookmarks",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                // {
                //     name: "serviceType",
                //     key: "serviceType",
                //     type: "string",
                //     // required: true
                // },
                
            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                // { $match: { _id: ObjectId(data.variantId) } },
                // {
                //     '$sort': {
                //       'cOn': -1
                //     }
                //   },
                { $unset: [ "__v", ] }

            ]

        },
        customFunction: true,
        response: {}
    },


    {
        path: "/user/bookmarks/create",
        type: "post",
        collection: "bookmarks",
        authEnabled: true,
        allowedBody: {
            default: ['userId', 'serviceType', 'bookmarkedObjectId'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/bookmarks/remove",
        type: "post",
        collection: "bookmarks",
        authEnabled: true,
        allowedBody: {
            default: ['userId', 'bookmarkId'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    // {
    //     path: "/client/variants/update",
    //     type: "post",
    //     collection: "variants",
    //     authEnabled: true,
    //     allowedBody: {
    //         default: ['name', 'pluginIds'],
    //         role1: [],
    //         role2: []
    //     },
    //     customFunction: false,
    //     response: {}
    // }

    // {
    //     path: "/user/rideDetail",
    //     type: "get",
    //     collection: "ride",
    //     authEnabled: true,
    //     allowedQueryParams: {
    //         default: [
    //             {
    //                 name: "rideId",
    //                 key: "_id",
    //                 type: "objectId",
    //                 required: true


    //             },
                

    //         ],
    //         role1: [],
    //         role2: []
    //     },
    //     appendAggregate: (data) => {
    //         return [
    //             // { $match: { _id: ObjectId(data.variantId) } },

    //             { $unset: ["_id", "__v", "cOn", "mOn"] }

    //         ]

    //     },
    //     customFunction: false,
    //     response: {}
    // },

]

export default routes