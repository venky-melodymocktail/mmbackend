import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/user/rentals",
        type: "get",
        collection: "rental",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                
                

            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                // { $match: { status: 'active' } },
                // {
                //     '$sort': {
                //       'cOn': -1
                //     }
                //   }
                // {
                //     '$skip': 100
                //   }
                // { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },
    {
        path: "/user/rentalDetail",
        type: "get",
        collection: "rental",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "rentalId",
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
        path: "/user/searchRentals",
        type: "get",
        collection: "rental",
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
        path: "/user/needarental",
        type: "get",
        collection: "needARental",
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
        path: "/user/needarentalDetail",
        type: "get",
        collection: "needARental",
        authEnabled: true,
        allowedQueryParams: {
            default: [
                {
                    name: "rentalId",
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
        path: "/user/rental/create",
        type: "post",
        collection: "rental",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "availabilityFrom", "availabilityTo", "noOfPeople", 'attachedBath', 'preferedGender', 'preferedRent', 'priceMode', 'negotiable', 'utilityRequired', "utilities", "roomFurnishingRequired", "amenities", "vegPreference", "smokingPolicy", "petFriendly", "Age", "occupation", "languages", "title", "description", "name", "email", "contactNumber", "files", 'promotion', 'rentalType'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/user/needarental/create",
        type: "post",
        collection: "needARental",
        authEnabled: true,
        allowedBody: {
            default: ['userId', "type", "exactAddress", "zipCode", "stayLeaseType", "availabilityFrom", "availabilityTo", "noOfPeople", 'attachedBath', 'preferedGender', 'preferedRent', 'negotiable', 'hiderent', 'pricemode', 'utilityRequired', "utilities", "roomFurnishingRequired", "amenities", "vegPreference", "smokingPolicy", "petFriendly", "Age", "occupation", "languages", "title", "description", "name", "email", "contactNumber", 'promotion', 'rentalType'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/searchNeedARentals",
        type: "get",
        collection: "needARental",
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
        path: "/user/rentalListings",
        type: "get",
        collection: "rental",
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
        path: "/user/needarentalListing",
        type: "get",
        collection: "needARental",
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