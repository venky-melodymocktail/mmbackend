import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/user/experts",
        type: "get",
        collection: "expert",
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
                
                { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },
    {
        path: "/admin/experts",
        type: "get",
        collection: "expert",
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
                
                { $unset: [ ] }

            ]

        },
        customFunction: true,
        response: {}
    },
    {
        path: "/user/slots",
        type: "get",
        collection: "expert",
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
                
                { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },

    {
        path: "/admin/experts/create",
        type: "post",
        collection: "expert",
        authEnabled: true,
        allowedBody: {
            default: ['name', 'email','phone', 'category', "status", 'slots',  ],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },


    

    {
        path: "/admin/experts/update",
        type: "post",
        collection: "expert",
        authEnabled: true,
        allowedBody: {
            default: ['name', 'email','phone', 'category', "status", 'slots', 'id' ],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },


]

export default routes