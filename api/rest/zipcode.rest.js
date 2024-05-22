import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/user/zipcode",
        type: "get",
        collection: "zipcodes",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                

            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                { $match: { zip: data.zipCode } },
                
                { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: false,
        response: {}
    },

    {
        path: "/user/zipcode/search",
        type: "get",
        collection: "zipcodes",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                

            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                // { $match: { zip: data.zipCode } },
                
                { $unset: [ "__v", "cOn", "mOn", "_id", "lat", "lng", "city", "state_name", ] }

            ]

        },
        customFunction: true,
        response: {}
    },
    {
        path: "/admin/zipcode/create",
        type: "post",
        collection: "zipcodes",
        authEnabled: true,
        allowedBody: {
            default: [ "zip", "lat", "lng", "city", "state_name", "country"],
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
        path:"/user/createCityList",
        type: "post",
        collection: "citylist",
        authEnabled: true,
        allowedBody: {
            default: [ "label", "title", "country", "countrycode", "statecode", "state", "city", "zipcode", "latitude", "longitude", "citystatecodeurl", "metrourl"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    }
    

    


    // {
    //     path: "/admin/blogDetail",
    //     type: "get",
    //     collection: "blogs",
    //     authEnabled: true,
    //     allowedQueryParams: {
    //         default: [
    //             {
    //                 name: "blogId",
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

    //             { $unset: [ "__v", "cOn", "mOn"] }

    //         ]

    //     },
    //     customFunction: false,
    //     response: {}
    // },

    // {
    //     path: "/admin/blogs/update",
    //     type: "post",
    //     collection: "blogs",
    //     authEnabled: true,
    //     allowedBody: {
    //         default: [ 'title', 'blogType', 'description', 'userId', "images", "travelType", "destination", "status", 'id', "pinned"],
    //         role1: [],
    //         role2: []
    //     },
    //     customFunction: true,
    //     response: {}
    // },


]

export default routes