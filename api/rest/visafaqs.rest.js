import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/user/visafaqs",
        type: "get",
        collection: "visafaqs",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                // {
                //     name: "variantId",
                //     key: "_id",
                //     type: "objectId",
                //     // required: true


                // }
                

            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                // { $match: { _id: ObjectId(data.variantId) } },

                { $unset: [ "__v", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },

    {
        path: "/admin/visafaqs",
        type: "get",
        collection: "visafaqs",
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

                { $unset: [ "__v"] }

            ]

        },
        customFunction: true,
        response: {}
    },
    {
        path: "/admin/visafaqsDetail",
        type: "get",
        collection: "visafaqs",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                

            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                { $match: { _id: ObjectId(data.id) } },

                { $unset: [ "__v"] }

            ]

        },
        customFunction: false,
        response: {}
    },

    {
        path: "/admin/visafaqs/create",
        type: "post",
        collection: "visafaqs",
        authEnabled: true,
        allowedBody: {
            default: ['question', 'category', 'answer', 'createdBy', 'pinned', 'status'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/admin/visafaqs/update",
        type: "post",
        collection: "visafaqs",
        authEnabled: true,
        allowedBody: {
            default: ['question', 'category', 'answer', 'createdBy', 'pinned', 'status', 'id'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    
    


    // {
    //     path: "/user/movieDetail",
    //     type: "get",
    //     collection: "movieSuggestion",
    //     authEnabled: true,
    //     allowedQueryParams: {
    //         default: [
    //             {
    //                 name: "movieId",
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

    //             { $unset: ["__v", "cOn", "mOn"] }

    //         ]

    //     },
    //     customFunction: false,
    //     response: {}
    // },

    // {
    //     path: "/admin/movieDetail/update",
    //     type: "post",
    //     collection: "movieSuggestion",
    //     authEnabled: true,
    //     allowedBody: {
    //         default: ['title', 'gener', 'rating', 'availableOn', 'image', 'language', 'category', 'description', 'country',  'trailerURL', 'id'],
    //         role1: [],
    //         role2: []
    //     },
    //     customFunction: true,
    //     response: {}
    // },

]

export default routes