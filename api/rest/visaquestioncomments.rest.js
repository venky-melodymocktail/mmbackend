import { ObjectId } from "mongodb"

var routes = [
  {
    path: "/user/visaquestioncomments",
    type: "get",
    collection: "visaquestioncomments",
    authEnabled: true,
    allowedQueryParams: {
      default: [
        {
          name: "visaQuestionID",
          key: "visaQuestionID",
          type: "string",
          // required: true
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
        // { $match: { _id: ObjectId(data.variantId) } },
        { $match: { "status": "active" } },
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
            'as': 'user'
          }
        },
        {
          '$unwind': {
            'path': '$user'
          }
        },
        {
          '$sort': {
            'cOn': -1
          }
        },
        { $unset: ["__v", "mOn"] }

      ]

    },
    customFunction: false,
    response: {}
  },

  {
    path: "/admin/visaquestioncomments",
    type: "get",
    collection: "visaquestioncomments",
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
        

      ]

    },
    customFunction: true,
    response: {}
  },
  {
    path: "/user/visaquestioncomments/create",
    type: "post",
    collection: "visaquestioncomments",
    authEnabled: true,
    allowedBody: {
      default: ['userId', 'comment', 'visaQuestionID', 'status', 'reportCount'],
      role1: [],
      role2: []
    },
    customFunction: true,
    response: {}
  },

  // {
  //     path: "/user/visaquestioncomments/report",
  //     type: "post",
  //     collection: "visaquestioncomments",
  //     authEnabled: true,
  //     allowedBody: {
  //         default: [ 'reportCount', 'id', 'userId',  ],
  //         role1: [],
  //         role2: []
  //     },
  //     customFunction: true,
  //     response: {}
  // },

  {
    path: "/user/visaquestioncomments/delete",
    type: "post",
    collection: "visaquestioncomments",
    authEnabled: true,
    allowedBody: {
      default: ['status', 'userId', 'visaQuestionCommentId'],
      role1: [],
      role2: []
    },
    customFunction: true,
    response: {}
  },
  {
    path: "/admin/visaquestioncomments/update",
    type: "post",
    collection: "visaquestioncomments",
    authEnabled: true,
    allowedBody: {
      default: ['status', 'userId', 'visaQuestionCommentId'],
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