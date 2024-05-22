import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/admin/blogCategory",
        type: "get",
        collection: "blogCategory",
        authEnabled: true,
        allowedQueryParams: {
            default: [


            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                { $match: { status: 'active' } },

                { $unset: ["__v", "cOn", "mOn"] }

            ]

        },
        customFunction: false,
        response: {}
    },
    {
        path: "/user/blogCategory",
        type: "get",
        collection: "blogCategory",
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
                { $match: { status: 'active' } },
                { $unset: ["__v", "cOn", "mOn"] }

            ]

        },
        customFunction: false,
        response: {}
    },

    {
        path: "/admin/blogCategory/create",
        type: "post",
        collection: "blogCategory",
        authEnabled: true,
        allowedBody: {
            default: ['name', 'email', 'phone', 'category', "status", 'slots',],
            role1: [],
            role2: []
        },
        customFunction: false,
        response: {}
    },

    {
        path: "/admin/blogCategory/update",
        type: "post",
        collection: "blogCategory",
        authEnabled: true,
        allowedBody: {
            default: ['name', 'email', 'phone', 'category', "status", 'slots', 'id'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    





]

export default routes