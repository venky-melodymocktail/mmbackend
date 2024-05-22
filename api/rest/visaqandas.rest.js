import { ObjectId } from "mongodb";

var routes = [
  {
    path: "/user/visaqandas",
    type: "get",
    collection: "visaqandas",
    authEnabled: true,
    allowedQueryParams: {
      default: [
        // {
        //     name: "variantId",
        //     key: "_id",
        //     type: "objectId",
        //     // required: true
        // }
      ],
      role1: [],
      role2: [],
    },
    appendAggregate: (data) => {
      return [
        // { $match: { _id: ObjectId(data.variantId) } },

        { $unset: ["__v", "mOn"] },
      ];
    },
    customFunction: true,
    response: {},
  },
  {
    path: "/user/visaqandasDetail",
    type: "get",
    collection: "visaqandas",
    authEnabled: true,
    allowedQueryParams: {
      default: [
        // {
        //     name: "variantId",
        //     key: "_id",
        //     type: "objectId",
        //     // required: true
        // }
      ],
      role1: [],
      role2: [],
    },
    appendAggregate: (data) => {
      console.log(data, "uservqa");
      return [
        { $match: { _id: ObjectId(data.visaQuestionId) } },
        {
          $set: {
            serviceId: { $toString: "$_id" },
          },
        },
        {
          $lookup: {
            from: "bookmarks",

            let: { userId: data.userId, bookmarkedObjectId: "$serviceId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$userId", "$$userId"] },
                      { $eq: ["$bookmarkedObjectId", "$$bookmarkedObjectId"] },
                    ],
                  },
                },
              },
            ],
            as: "matchedBookmarks",
          },
        },
        {
          $addFields: {
            isBookmarked: {
              $cond: {
                if: { $gt: [{ $size: "$matchedBookmarks" }, 0] },
                then: true,
                else: false,
              },
            },
          },
        },

        { $unset: ["__v", "mOn"] },
      ];
    },
    customFunction: false,
    response: {},
  },
  {
    path: "/admin/visaqandas",
    type: "get",
    collection: "visaqandas",
    authEnabled: true,
    allowedQueryParams: {
      default: [],
      role1: [],
      role2: [],
    },
    appendAggregate: (data) => {
      return [{ $unset: ["__v"] }];
    },
    customFunction: true,
    response: {},
  },

  {
    path: "/user/visaqandas/create",
    type: "post",
    collection: "visaqandas",
    authEnabled: true,
    allowedBody: {
      default: [
        "question",
        "category",
        "createdBy",
        "status",
        "userId",
        "bookmarkCount",
        "reportCount",
      ],
      role1: [],
      role2: [],
    },
    customFunction: true,
    response: {},
  },

  {
    path: "/admin/visaqandas/update",
    type: "post",
    collection: "visaqandas",
    authEnabled: true,
    allowedBody: {
      default: [
        "question",
        "category",
        "createdBy",
        "status",
        "userId",
        "id",
        "answers",
        "answeredOn",
        "answered",
        "commentCount",
      ],
      role1: [],
      role2: [],
    },
    customFunction: true,
    response: {},
  },

  {
    path: "/user/visaqandas/update",
    type: "post",
    collection: "visaqandas",
    authEnabled: true,
    allowedBody: {
      default: ["question", "category", "createdBy", "status", "userId", "id"],
      role1: [],
      role2: [],
    },
    customFunction: true,
    response: {},
  },

  // {
  //     path: "/user/visaqandas/updateCounts",
  //     type: "post",
  //     collection: "visaqandas",
  //     authEnabled: true,
  //     allowedBody: {
  //         default: [ 'bookmarkCount', 'reportCount', 'id', 'userId', 'commentCount'],
  //         role1: [],
  //         role2: []
  //     },
  //     customFunction: true,
  //     response: {}
  // },

  {
    path: "/user/visaqandasListing",
    type: "get",
    collection: "visaqandas",
    authEnabled: true,
    allowedQueryParams: {
      default: [
        // {
        //     name: "variantId",
        //     key: "_id",
        //     type: "objectId",
        //     // required: true
        // }
      ],
      role1: [],
      role2: [],
    },
    appendAggregate: (data) => {
      return [
        // { $match: { _id: ObjectId(data.variantId) } },

        { $unset: ["__v", "mOn"] },
      ];
    },
    customFunction: true,
    response: {},
  },
];

export default routes;
