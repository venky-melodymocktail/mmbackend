import { ObjectId } from "mongodb"

var routes = [

    {
        path: "/user/report",
        type: "post",
        collection: "report",
        authEnabled: true,
        allowedBody: {
            default: ['userId', 'reportedBy', 'reportType', 'reportedId', 'firstName', 'lastName', 'email', 'phone', 'resonOfReporting'],
            role1: [],
            role2: []
        },
        customFunction: true,
        response: {}
    },

    {
        path: "/admin/reports",
        type: "get",
        collection: "report",
        authEnabled: true,
        allowedQueryParams: {
            default: [

            ],
            role1: [],
            role2: []
        },
        appendAggregate: (data) => {
            return [
                // { $match: { reportedId: data.reportedId } },
                // {
                //     '$sort': {
                //         'cOn':-1,
                //     }
                // },

                // { $unset: ["__v", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    },




]

export default routes