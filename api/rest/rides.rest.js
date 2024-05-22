import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/user/rideSharing",
        type: "get",
        collection: "rides",
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

                // { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/haveARide",
        type: "get",
        collection: "rides",
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

                // { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },


    {
        path: "/user/rideSharing/create",
        type: "post",
        collection: "rides",
        authEnabled: true,
        allowedBody: {
            default: ['to', 'from', 'price', 'dateOfJourney', 'postedBy', 'adType', 'spotAvailable', 'userId', 'city', 'state', 'country', 'zipcode', 'promotion', 'contactNumber', 'email', 'time', 'timeNum', 'status', 'userId'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/user/needARide/create",
        type: "post",
        collection: "rides",
        authEnabled: true,
        allowedBody: {

            default: ['to', 'from', 'price', 'dateOfJourney', 'postedBy', 'adType', 'spotAvailable', 'userId', 'city', 'state', 'country', 'zipcode', 'promotion', 'contactNumber', 'email', 'time', 'timeNum', 'gender', 'status', 'userId'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/admin/rideSharing/update",
        type: "post",
        collection: "rides",
        authEnabled: true,
        allowedBody: {
            default: ['to', 'from', 'price', 'dateOfJourney', 'postedBy', 'adType', 'spotAvailable', 'userId', 'city', 'state', 'country', 'zipcode', 'promotion', 'id', 'status'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/rideSharing/update",
        type: "post",
        collection: "rides",
        authEnabled: true,
        allowedBody: {
            default: ['to', 'from', 'price', 'dateOfJourney', 'postedBy', 'adType', 'spotAvailable', 'userId', 'city', 'state', 'country', 'zipcode', 'id', 'status'],
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

    {
        path: "/user/rideDetail",
        type: "get",
        collection: "rides",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "rideId",
                    key: "_id",
                    type: "objectId",
                    required: true


                },


            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                // { $match: { _id: ObjectId(data.variantId) } },

                // { $unset: ["_id", "__v", "cOn", "mOn"] }
                {
                    '$unset': [
                      
                      '__v',
                      'mOn',
                      'email',
                      'contactNumber'
                    ]
                  }
            ]

        },
        customFunction: false,
        response: {}
    },
    {
        path: "/admin/rideSharing",
        type: "get",
        collection: "rides",
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

                // { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },
    {
        path: "/admin/haveARide",
        type: "get",
        collection: "rides",
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

                // { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/rideListings",
        type: "get",
        collection: "rides",
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

                // { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },

]

export default routes