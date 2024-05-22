import { ObjectId } from "mongodb"


var routes = [
    {
        path: "/user/travelSuggestion",
        type: "get",
        collection: "travelSuggestion",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                // {
                //     name: "variantId",
                //     key: "_id",
                //     type: "objectId",
                //     // required: true


                // }
                {
                    name: "travelId",
                    key: "_id",
                    type: "objectId",
                    // required: true


                },
                {
                    name: "country",
                    key: "country",
                    type: "string",
                    // required: true


                },
                {
                    name: "category",
                    key: "category",
                    type: "string",
                    // required: true


                },
                {
                    name: "title",
                    key: "title",
                    type: "string",
                    // required: true


                },

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
        customFunction: false,
        response: {}
    },


    {
        path: "/user/travelSuggestion/create",
        type: "post",
        collection: "travelSuggestion",
        authEnabled: true,
        allowedBody: {
            default: ['title', 'description', 'image', 'country', 'category', 'userId'],
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
        path: "/user/travelDetails",
        type: "get",
        collection: "travelSuggestion",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "travelId",
                    key: "_id",
                    type: "objectId",
                    required: true


                },
                // {
                //     name: "country",
                //     key: "country",
                //     type: "string",
                //     // required: true


                // },
                // {
                //     name: "category",
                //     key: "category",
                //     type: "string",
                //     // required: true


                // },
                // {
                //     name: "title",
                //     key: "title",
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
                // [$lookup: {from:'comments', }],
                // [{$lookup : {from:'comments', localField:"_id", foreignField:"blogId", as:"comments"}}],
                
                { $unset: [ "__v", "cOn", "mOn"] },
                
                // { $addFields: { "Id": { "$toString": "$_id" }}},
                // {
                //     $project: {
                //       _id: {
                //         $toString: "$_id"
                //       }
                //     }
                //   },
                {
                    '$addFields': {
                      'id': {
                        '$toString': '$_id'
                      }
                    }
                },
                {
                    $lookup: {
                      'from': 'comments', 
                      'localField': 'id', 
                      'foreignField': 'blogId', 
                      'as': 'comments'
                    }
                  },
                    
                

            ]

        },
        customFunction: false,
        response: {}
    },

]

export default routes