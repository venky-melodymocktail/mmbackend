import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/user/rooms",
        type: "get",
        collection: "rooms",
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
        path: "/user/rooms/create",
        type: "post",
        collection: "rooms",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "availabilityFrom", "availabilityTo", "noOfPeople", 'attachedBath', 'preferedGender', 'preferedRent', 'priceMode', 'negotiable', 'utilityRequired', "utilities", "roomFurnishingRequired", "amenities", "vegPreference", "smokingPolicy", "petFriendly", "Age", "occupation", "languages", "title", "description", "name", "email", "contactNumber", "files", 'promotion'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/user/needaroom/create",
        type: "post",
        collection: "needaroom",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "availabilityFrom", "availabilityTo", "noOfPeople", 'attachedBath', 'preferedGender', 'preferedRent', 'negotiable', 'hiderent', 'pricemode', 'utilityRequired', "utilities", "roomFurnishingRequired", "amenities", "vegPreference", "smokingPolicy", "petFriendly", "Age", "occupation", "languages", "title", "description", "name", "email", "contactNumber", 'promotion'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/needaroom",
        type: "get",
        collection: "needaroom",
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
        path: "/user/roomsDetail",
        type: "get",
        collection: "rooms",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "roomId",
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

                // { $unet: ["_id", "__v", "cOn", "mOn"] }
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
        path: "/user/needaroomDetail",
        type: "get",
        collection: "needaroom",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "needaroomId",
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
        path: "/admin/rooms/update",
        type: "post",
        collection: "rooms",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "availabilityFrom", "availabilityTo", "noOfPeople", 'attachedBath', 'preferedGender', 'preferedRent', 'priceMode',  'negotiable', 'utilityRequired', "utilities", "roomFurnishingRequired", "amenities", "vegPreference", "smokingPolicy", "petFriendly", "Age", "occupation", "languages", "title", "description", "name", "email", "contactNumber", "files", 'promotion', "id", "status"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/rooms/update",
        type: "post",
        collection: "rooms",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "availabilityFrom", "availabilityTo", "noOfPeople", 'attachedBath', 'preferedGender', 'preferedRent', 'priceMode',  'negotiable', 'utilityRequired', "utilities", "roomFurnishingRequired", "amenities", "vegPreference", "smokingPolicy", "petFriendly", "Age", "occupation", "languages", "title", "description", "name", "email", "contactNumber", "files", "id", "status"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/needARooms/update",
        type: "post",
        collection: "needaroom",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "availabilityFrom", "availabilityTo", "noOfPeople", 'attachedBath', 'preferedGender', 'preferedRent', 'negotiable', 'hiderent', 'pricemode', 'utilityRequired', "utilities", "roomFurnishingRequired", "amenities", "vegPreference", "smokingPolicy", "petFriendly", "Age", "occupation", "languages", "title", "description", "name", "email", "contactNumber", "status", "id", "rentalType"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/admin/needARooms/update",
        type: "post",
        collection: "needaroom",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "availabilityFrom", "availabilityTo", "noOfPeople", 'attachedBath', 'preferedGender', 'preferedRent', 'negotiable', 'hiderent', 'pricemode', 'utilityRequired', "utilities", "roomFurnishingRequired", "amenities", "vegPreference", "smokingPolicy", "petFriendly", "Age", "occupation", "languages", "title", "description", "name", "email", "contactNumber", 'promotion', "status", "id", "rentalType"],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/searchRooms",
        type: "get",
        collection: "rooms",
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

    // {
    //     path: "/user/needaroom/create",
    //     type: "post",
    //     collection: "rides",
    //     authEnabled: true,
    //     allowedBody: {
    //         default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "availabilityFrom", "availabilityTo", "noOfPeople", 'attachedBath', 'preferedGender', 'preferredRent', 'negotiable', 'utilityRequired', "utilities", "roomFurnishingRequired", "amenities", "vegPreference", "smokingPolicy", "petFriendly", "Age", "occupation", "languages", "tittle", "description", "name", "email", "contactNumber", "files", 'promotion'],
    //         role1: [],
    //         role2: []
    //     },
    //     customFunction: false,
    //     response: {}
    // },

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
        path: "/admin/rooms",
        type: "get",
        collection: "rooms",
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
        path: "/admin/needaroom",
        type: "get",
        collection: "needaroom",
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
        path: "/user/roomsListings",
        type: "get",
        collection: "rooms",
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
        path: "/user/needaroomListing",
        type: "get",
        collection: "needaroom",
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