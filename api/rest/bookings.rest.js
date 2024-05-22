import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/user/bookings",
        type: "get",
        collection: "bookings",
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

                { $unset: ["__v", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },


    {
        path: "/user/bookings/create",
        type: "post",
        collection: "bookings",
        authEnabled: true,
        allowedBody: {
            default: ['category', "expertId", 'slot', 'date', "userId", "type", "otherDetails", "paymentPlatform"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/bookings/paymentupdate",
        type: "post",
        collection: "bookings",
        authEnabled: true,
        allowedBody: {
            default: ['bookingId', "paymentStatus"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },


    // {
    //     path: "/user/bookings/create",
    //     type: "post",
    //     collection: "bookings",
    //     authEnabled: true,
    //     allowedBody: {
    //         default: ['category', "expertId", 'slots', 'date', "userId"],
    //         role1: [],
    //         role2: []
    //     },
    //     customFunction: true,
    //     response: {}
    // },

    // {
    //     path: "/admin/experts/update",
    //     type: "post",
    //     collection: "expert",
    //     authEnabled: true,
    //     allowedBody: {
    //         default: ['name', 'email','phone', 'category', "status", 'slots', 'id' ],
    //         role1: [],
    //         role2: []
    //     },
    //     customFunction: true,
    //     response: {}
    // },


    {
        path: "/user/orders",
        type: "get",
        collection: "orders",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "type",
                    key: "type",
                    // type: "objectId",
                    required: false


                },

                {
                    name: "status",
                    key: "status",
                    // type: "objectId",
                    required: false


                },


            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                // { $match: { _id: ObjectId(data.variantId) } },

                { $unset: ["__v", "mOn"] }

            ]

        },
        customFunction: false,
        response: {}
    },



    {
        path: "/user/order/create",
        type: "post",
        collection: "orders",
        authEnabled: true,
        allowedBody: {
            default: ['amount'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/user/order/update",
        type: "post",
        collection: "orders",
        authEnabled: true,
        allowedBody: {
            default: ['orderId', 'type'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/admin/Bookings",
        type: "get",
        collection: "bookings",
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
        path: "/admin/updateBookings",
        type: "post",
        collection: "orders",
        authEnabled: true,
        allowedBody: {
            default: ["expertId", 'id'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

]

export default routes