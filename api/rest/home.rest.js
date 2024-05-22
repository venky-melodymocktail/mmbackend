import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/user/homes",
        type: "get",
        collection: "home",
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
        customFunction: true,
        response: {}
    },

    {
        path: "/user/needAHomes",
        type: "get",
        collection: "needahome",
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
        customFunction: true,
        response: {}
    },

    {
        path: "/user/home/create",
        type: "post",
        collection: "home",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "availabilityFrom",
                "availabilityTo", "noOfPeople", "utilities", "roomFurnishingRequired", "amenities", "vegPreference",
                "smokingPolicy", "petFriendly", "Age", "occupation", "title", "description", "name", "email",
                "contactNumber", "files", 'promotion', "files", "preferredRent", "priceMode"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/admin/home/update",
        type: "post",
        collection: "home",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "availabilityFrom", "availabilityTo", "noOfPeople", "utilities", "roomFurnishingRequired", "amenities", "vegPreference", "smokingPolicy", "petFriendly", "Age", "occupation", "title", "description", "name", "email", "contactNumber", "files", 'promotion', "id", "status", "files", "preferredRent"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/user/home/update",
        type: "post",
        collection: "home",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "availabilityFrom", "availabilityTo", "noOfPeople", "utilities", "roomFurnishingRequired", "amenities", "vegPreference", "smokingPolicy", "petFriendly", "Age", "occupation", "title", "description", "name", "email", "contactNumber", "files", "id", "status", "files", "preferredRent"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/admin/needAHome/update",
        type: "post",
        collection: "needahome",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "neededBy", "noOfPeople", "utilities", "roomFurnishingRequired", "amenities", "smokingPolicy", "petFriendly", "title", "description", "name", "email", "contactNumber", 'promotion', "id", "status"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/needAHome/update",
        type: "post",
        collection: "needahome",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "neededBy", "noOfPeople", "utilities", "roomFurnishingRequired", "amenities", "smokingPolicy", "petFriendly", "title", "description", "name", "email", "contactNumber", "id", "status", "rentalType"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/needAHome/create",
        type: "post",
        collection: "needahome",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "neededBy", "noOfPeople", "utilities", "roomFurnishingRequired", "amenities", "smokingPolicy", "petFriendly", "title", "description", "name", "email", "contactNumber", 'promotion'],
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
        path: "/user/homeDetail",
        type: "get",
        collection: "home",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "homeId",
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
                // { $match: { _id: ObjectId(data.homeId) } },

                { $unset: ["mOn"] },
                {
                    '$set': {
                        'userId': {
                            '$toObjectId': '$userId'
                        }
                    }
                },
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'userId',
                        'foreignField': '_id',
                        'as': 'userDetail'
                    }
                },
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
        path: "/user/needAHomeDetail",
        type: "get",
        collection: "needahome",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "needAHomeId",
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

                { $unset: ["mOn"] },
                {
                    '$set': {
                        'userId': {
                            '$toObjectId': '$userId'
                        }
                    }
                },
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'userId',
                        'foreignField': '_id',
                        'as': 'userDetail'
                    }
                },
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
        path: "/user/searchHomes",
        type: "get",
        collection: "home",
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
        path: "/user/homes",
        type: "get",
        collection: "home",
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
        path: "/admin/needAHomes",
        type: "get",
        collection: "needahome",
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
        path: "/admin/homes",
        type: "get",
        collection: "home",
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
        path: "/user/homeListing",
        type: "get",
        collection: "home",
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
        path: "/user/needAHomeListing",
        type: "get",
        collection: "needahome",
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