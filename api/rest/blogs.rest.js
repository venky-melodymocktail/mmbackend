import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/user/blogs",
        type: "get",
        collection: "blogs",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "category",
                    key: "blogType",
                    type: "string",
                    required: false
                },
                {
                    name: "travelType",
                    key: "travelType",
                    type: "string",
                    required: false
                },
                {
                    name: "destination",
                    key: "destination",
                    type: "string",
                    required: false
                },

                // {
                //     name: "search",
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
                // { $match: { _id: ObjectId(data.variantId) } },

                { $unset: ["__v", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },


    {
        path: "/admin/blogs/create",
        type: "post",
        collection: "blogs",
        authEnabled: true,
        allowedBody: {
            default: ['title', 'blogType', 'description', 'userId', "travelType", "destination", "status", "pinned", "image"],
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
        path: "/user/blogDetail",
        type: "get",
        collection: "blogs",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "blogId",
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

                { $unset: ["__v", "mOn", "description.draft"] }

            ]

        },
        customFunction: false,
        response: {}
    },

    // {
    //     path: "/user/blogs/search",
    //     type: "get",
    //     collection: "blogs",
    //     authEnabled: true,
    //     allowedQueryParams: {
    //         default: [
    //             // {
    //             //     name: "search",
    //             //     key: "title",
    //             //     type: "string",
    //             //     required: false


    //             // },


    //         ],
    //         role1: [],
    //         role2: []
    //     },
    //     appendAggregate: (data) => {
    //         return [
    //             // { $match: { _id: ObjectId(data.variantId) } },

    //             { $unset: [ "__v", "cOn", "mOn"] }

    //         ]

    //     },
    //     customFunction: true,
    //     response: {}
    // },

    {
        path: "/admin/blogs",
        type: "get",
        collection: "blogs",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                // {
                //     name: "category",
                //     key: "blogType",
                //     type: "string",
                //     required: false
                // },
                // {
                //     name: "travelType",
                //     key: "travelType",
                //     type: "string",
                //     required: false
                // },
                // {
                //     name: "destination",
                //     key: "destination",
                //     type: "string",
                //     required: false
                // },
                // {
                //     name: "search",
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
                // { $match: { _id: ObjectId(data.variantId) } },

                { $unset: ["__v"] }

            ]

        },
        customFunction: true,
        response: {}
    },


    {
        path: "/admin/blogDetail",
        type: "get",
        collection: "blogs",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "blogId",
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

                { $unset: ["__v", "cOn", "mOn"] }

            ]

        },
        customFunction: false,
        response: {}
    },

    {
        path: "/admin/blogs/update",
        type: "post",
        collection: "blogs",
        authEnabled: true,
        allowedBody: {
            default: ['title', 'blogType', 'description', 'userId', "images", "travelType", "destination", "status", 'id', "pinned", "image"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },


]

export default routes