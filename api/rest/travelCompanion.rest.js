import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/user/travelCompanion",
        type: "get",
        collection: "travelCompanion",
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
        path: "/admin/travelCompanion",
        type: "get",
        collection: "travelCompanion",
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
        path: "/user/travelCompanionDetail",
        type: "get",
        collection: "travelCompanion",
        authEnabled: true,
        allowedQueryParams: {
            default: [
               

            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                { $match: { _id: ObjectId(data.tcId) } },
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
                      'phone'
                    ]
                  }
                // { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: false,
        response: {}
    },

    {
        path: "/user/willBeATravelCompanion",
        type: "get",
        collection: "willBeATravelCompanion",
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
        path: "/admin/willBeATravelCompanion",
        type: "get",
        collection: "willBeATravelCompanion",
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
        path: "/user/willBeATravelCompanionDetail",
        type: "get",
        collection: "willBeATravelCompanion",
        authEnabled: true,
        allowedQueryParams: {
            default: [
               

            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                { $match: { _id: ObjectId(data.tcId) } },
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
                      'phone'
                    ]
                  }

                // { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: false,
        response: {}
    },



    {
        path: "/user/travelCompanion/create",
        type: "post",
        collection: "travelCompanion",
        authEnabled: true,
        allowedBody: {
            default: ['firstName', 'lastName', 'ticketBooked', 'from', 'to', 'stops', 'dateOfJourrney', 'fromDate', 'toDate', 'timeOfJourney', 'airline', 'email', 'phone', 'languageKnown', 'vaccinated', 'tip', 'status', 'promotion', 'userId', 'preferredAirline'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/user/travelCompanion/update",
        type: "post",
        collection: "travelCompanion",
        authEnabled: true,
        allowedBody: {
            default: ['firstName', 'lastName', 'ticketBooked', 'from', 'to', 'stops', 'dateOfJourrney', 'fromDate', 'toDate', 'timeOfJourney', 'airline', 'email', 'phone', 'languageKnown', 'vaccinated', 'tip', 'status','userId', 'id', 'preferredAirline'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/admin/travelCompanion/update",
        type: "post",
        collection: "travelCompanion",
        authEnabled: true,
        allowedBody: {
            default: ['firstName', 'lastName', 'ticketBooked', 'from', 'to', 'stops', 'dateOfJourrney', 'fromDate', 'toDate', 'timeOfJourney', 'airline', 'email', 'phone', 'languageKnown', 'vaccinated', 'tip', 'status', 'promotion', 'userId', 'id', 'preferredAirline'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    // {
    //     path: "/admin/travelCompanion/update",
    //     type: "post",
    //     collection: "travelCompanion",
    //     authEnabled: true,
    //     allowedBody: {
    //         default: ['firstName', 'lastName', 'ticketBooked', 'from', 'to', 'stops', 'dateOfJourrney', 'fromDate', 'toDate', 'timeOfJourney', 'airline', 'email', 'phone', 'languageKnown', 'vaccinated', 'tip', 'status', 'promotion', 'userId', 'id'],
    //         role1: [],
    //         role2: []
    //     },
    //     customFunction: true,
    //     response: {}
    // },
    {
        path: "/user/willBeATravelCompanion/create",
        type: "post",
        collection: "willBeATravelCompanion",
        authEnabled: true,
        allowedBody: {
            default: ['firstName', 'lastName', 'ticketBooked', 'from', 'to', 'stops', 'dateOfJourrney', 'fromDate', 'toDate', 'timeOfJourney', 'airline', 'email', 'phone', 'languageKnown', 'vaccinated', 'tip', 'status', 'promotion', "userId", 'preferredAirline'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/user/willBeATravelCompanion/update",
        type: "post",
        collection: "willBeATravelCompanion",
        authEnabled: true,
        allowedBody: {
            default: ['firstName', 'lastName', 'ticketBooked', 'from', 'to', 'stops', 'dateOfJourrney', 'fromDate', 'toDate', 'timeOfJourney', 'airline', 'email', 'phone', 'languageKnown', 'vaccinated', 'tip', 'status', 'id', 'preferredAirline'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/Admin/willBeATravelCompanion/update",
        type: "post",
        collection: "willBeATravelCompanion",
        authEnabled: true,
        allowedBody: {
            default: ['firstName', 'lastName', 'ticketBooked', 'from', 'to', 'stops', 'dateOfJourrney', 'fromDate', 'toDate', 'timeOfJourney', 'airline', 'email', 'phone', 'languageKnown', 'vaccinated', 'tip', 'status', 'promotion', 'id', 'preferredAirline'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },
    {
        path: "/user/travelCompanionListing",
        type: "get",
        collection: "travelCompanion",
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
                      'phone'
                    ]
                  }
            ]

        },
        customFunction: true,
        response: {}
    },

    {
        path: "/user/willBeATravelCompanionListing",
        type: "get",
        collection: "willBeATravelCompanion",
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
                      'phone'
                    ]
                  }
            ]

        },
        customFunction: true,
        response: {}
    },

]

export default routes