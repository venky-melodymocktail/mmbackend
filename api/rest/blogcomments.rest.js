import { ObjectId } from "mongodb"

var routes = [
  {
    path: "/user/blogcomments",
    type: "get",
    collection: "blogcomments",
    authEnabled: true,
    allowedQueryParams: {
      default: [
        {
          name: "blogId",
          key: "blogId",
          type: "string",
          required: true
        },
        {
          name: "status",
          key: "status",
          type: "string",
          // required: true
        },

      ],
      role1: [],
      role2: []
    },
    appendAggregate: (data) => {
      return [
        { $match: { status: "active" } },
        {
          '$set': {
            'userId': {
              '$toObjectId': '$userId'
            }
          }
        }, {
          '$lookup': {
            'from': 'users',
            'localField': 'userId',
            'foreignField': '_id',
            'as': 'user'
          }
        }, {
          '$unwind': {
            'path': '$user'
          }
        },
        {
          '$sort': {
            'cOn': -1
          }
        },
        { $unset: ["__v",] }

      ]

    },
    customFunction: false,
    response: {}
  },


  {
    path: "/admin/blogcomments",
    type: "get",
    collection: "blogcomments",
    authEnabled: true,
    allowedQueryParams: {
      default: [


      ],
      role1: [],
      role2: []
    },
    appendAggregate: (data) => {
      return [

        { $unset: ["__v",] }

      ]

    },
    customFunction: true,
    response: {}
  },


  {
    path: "/user/blogcomments/create",
    type: "post",
    collection: "blogcomments",
    authEnabled: true,
    allowedBody: {
      default: ['userId', 'comment', 'blogId', 'status'],
      role1: [],
      role2: []
    },
    customFunction: true,
    response: {}
  },

  {
    path: "/user/blogcomments/delete",
    type: "post",
    collection: "blogcomments",
    authEnabled: true,
    allowedBody: {
      default: ['userId', 'blogId', 'status', 'id'],
      role1: [],
      role2: []
    },
    customFunction: true,
    response: {}
  },
  {
    path: "/user/blogcomments/report",
    type: "post",
    collection: "blogcomments",
    authEnabled: true,
    allowedBody: {
      default: ['userId', 'blogId', 'status', 'id'],
      role1: [],
      role2: []
    },
    customFunction: true,
    response: {}
  },
  {
    path: "/admin/blogcomments/update",
    type: "post",
    collection: "blogcomments",
    authEnabled: true,
    allowedBody: {
      default: ['userId', 'blogId', 'status', 'id'],
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

  // {
  //     path: "/user/rideDetail",
  //     type: "get",
  //     collection: "ride",
  //     authEnabled: true,
  //     allowedQueryParams: {
  //         default: [
  //             {
  //                 name: "rideId",
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

  //             { $unset: ["_id", "__v", "cOn", "mOn"] }

  //         ]

  //     },
  //     customFunction: false,
  //     response: {}
  // },

]

export default routes