import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/userDetail",
        type: "get",
        collection: "users",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                // {
                //     name: "userId",
                //     key: "_id",
                //     type: "objectId",
                //     required: true
                // },
                // {
                //     name: "userId",
                //     key: "userId",
                //     type: "string",
                //     required: true
                // },

            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                { $match: { _id: ObjectId(data.userId) } },

                { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: false,
        response: {}
    },


    {
        path: "/user/update",
        type: "post",
        collection: "users",
        authEnabled: true,
        allowedBody: {
            default: ['userId', 'name', 'phone', 'email', 'address', 'profilePic', 'firstName', 'lastName'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/admin/users/update",
        type: "post",
        collection: "users",
        authEnabled: true,
        allowedBody: {
            default: ['uid', 'name', 'phone', 'email', 'address', 'status', 'firstName', 'lastName'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/admin/users",
        type: "get",
        collection: "users",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                // {
                //     name: "userId",
                //     key: "_id",
                //     type: "objectId",
                //     // required: true
                // },
                // {
                //     name: "userId",
                //     key: "userId",
                //     type: "string",
                //     required: true
                // },

            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                {
                    '$sort': {
                      'cOn': -1
                    }
                },
                // { $match: { _id: ObjectId(data.variantId) } },

                { $unset: [ "__v", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },
    // {
    //     path: "/user/isUser",
    //     type: "get",
    //     collection: "users",
    //     authEnabled: false,
    //     allowedQueryParams: {
    //         default: [
    //             // {
    //             //     name: "phone",
    //             //     key: "phone",
    //             //     type: "String",
    //             //     required: true
    //             // },
    //             // {
    //             //     name: "userId",
    //             //     key: "userId",
    //             //     type: "string",
    //             //     required: true
    //             // },

    //         ],
    //         role1: [],
    //         role2: []
    //     },
    //     appendAggregate: (data) => {
    //         var phone = data.phone
    //         return [
    //             // {
    //             //     '$sort': {
    //             //       'cOn': -1
    //             //     }
    //             // },
    //             // { $match: { _id: ObjectId(data.variantId) } },
    //             {
    //                 '$match': {
    //                   'phone': data.phone
    //                 }
    //               },

    //             { $unset: [ "__v", "mOn", 'email', 'address', 'profilePic', 'cOn', 'name', '_id'] }

    //         ]

    //     },
    //     customFunction: false,
    //     response: {}
    // },

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
    //     path: "/user/update",
    //     type: "get",
    //     collection: "users",
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