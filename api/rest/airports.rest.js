import { ObjectId } from "mongodb"

var routes = [
    {
        path: "/user/airports",
        type: "get",
        collection: "airports",
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
                
                { $unset: [ "__v", "cOn", "mOn"] }

            ]

        },
        customFunction: true,
        response: {}
    }
    


]

export default routes