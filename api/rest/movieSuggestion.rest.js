
var routes = [
    {
        path: "/user/movieSuggestion",
        type: "get",
        collection: "movieSuggestion",
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

                { $unset: ["__v", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },


    {
        path: "/admin/movieSuggestion/create",
        type: "post",
        collection: "movieSuggestion",
        authEnabled: true,
        allowedBody: {
            default: ['title', 'genre', 'rating', 'availableOn', 'image', 'language', 'category', 'description', 'country', 'trailerURL', 'userId', "status"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/admin/movieSuggestion",
        type: "get",
        collection: "movieSuggestion",
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

                { $unset: ["__v",  "mOn"] }

            ]

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
        path: "/user/movieDetail",
        type: "get",
        collection: "movieSuggestion",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "movieId",
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
        path: "/admin/movieDetail/update",
        type: "post",
        collection: "movieSuggestion",
        authEnabled: true,
        allowedBody: {
            default: ['title', 'genre', 'rating', 'availableOn', 'image', 'language', 'category', 'description', 'country', 'trailerURL', 'id', 'status'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

]

export default routes