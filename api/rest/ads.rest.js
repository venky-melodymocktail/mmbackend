import { ObjectId } from "mongodb";

var routes = [
  {
    path: "/admin/adSpaces",
    type: "get",
    collection: "adSpaces",
    authEnabled: true,
    allowedQueryParams: {
      default: [],
      role1: [],
      role2: [],
    },
    appendAggregate: (data) => {
      return [
        // { $match: { _id: ObjectId(data.variantId) } },

        { $unset: ["__v", "cOn", "mOn"] },
      ];
    },
    customFunction: false,
    response: {},
  },

  {
    path: "/admin/ads",
    type: "get",
    collection: "ads",
    authEnabled: true,
    allowedQueryParams: {
      default: [],
      role1: [],
      role2: [],
    },
    disableMatch: true,
    diableLimitSkip: true,
    appendAggregate: (data) => {
      let limit = 10;
      let skip = 0;
      if (data.limit) {
        limit = Number(data.limit);
      }
      if (data.page) {
        skip = (data.page - 1) * limit;
      }
      if (data.name) {
        return [
          {
            $facet:
              /**
               * outputFieldN: The first output field.
               * stageN: The first aggregation stage.
               */
              {
                data: [
                  { $match: { name: { $regex: data.name, $options: "i" } } },

                  {
                    $skip: skip,
                  },
                  {
                    $limit: limit,
                  },
                  { $unset: ["__v", "cOn", "mOn"] },
                ],
                count: [
                  {
                    $match: {},
                  },
                  {
                    $count: "totalCount",
                  },
                  {
                    $set: {
                      pages: {
                        $ceil: {
                          $divide: ["$totalCount", 3],
                        },
                      },
                    },
                  },
                ],
              },
          },
          {
            $unwind:
              /**
               * path: Path to the array field.
               * includeArrayIndex: Optional name for index.
               * preserveNullAndEmptyArrays: Optional
               *   toggle to unwind null and empty values.
               */
              {
                path: "$count",
              },
          },

          // { $unset: ["__v", "cOn", "mOn"] }
        ];
      } else {
        return [
          {
            $facet:
              /**
               * outputFieldN: The first output field.
               * stageN: The first aggregation stage.
               */
              {
                data: [
                  {
                    $skip: skip,
                  },
                  {
                    $limit: limit,
                  },
                  { $unset: ["__v", "cOn", "mOn"] },
                ],
                count: [
                  {
                    $match: {},
                  },
                  {
                    $count: "totalCount",
                  },
                  {
                    $set: {
                      pages: {
                        $ceil: {
                          $divide: ["$totalCount", limit],
                        },
                      },
                    },
                  },
                ],
              },
          },
          {
            $unwind:
              /**
               * path: Path to the array field.
               * includeArrayIndex: Optional name for index.
               * preserveNullAndEmptyArrays: Optional
               *   toggle to unwind null and empty values.
               */
              {
                path: "$count",
              },
          },

          // { $unset: ["__v", "cOn", "mOn"] }
        ];
      }
    },
    customFunction: false,
    response: {},
  },

  {
    path: "/admin/ad/create",
    type: "post",
    collection: "ads",
    authEnabled: true,
    allowedBody: {
      default: ["name", "adSpaceId", "urls", "redirectUrl", "expiresOn"],
      role1: [],
      role2: [],
    },
    customFunction: true,
    response: {},
  },

  {
    path: "/admin/ad/update",
    type: "post",
    collection: "ads",
    authEnabled: true,
    allowedBody: {
      default: ["id", "urls", "redirectUrl", "expiresOn", "name"],
      role1: [],
      role2: [],
    },
    customFunction: true,
    response: {},
  },
  {
    path: "/admin/ad/updatestatus",
    type: "post",
    collection: "ads",
    authEnabled: true,
    allowedBody: {
      default: ["id", "status"],
      role1: [],
      role2: [],
    },
    customFunction: true,
    response: {},
  },
  {
    path: "/admin/adSpaces/create",
    type: "post",
    collection: "adSpaces",
    authEnabled: true,
    allowedBody: {
      default: ["name", "sizes"],
      role1: [],
      role2: [],
    },
    customFunction: true,
    response: {},
  },

  {
    path: "/user/adSpaces",
    type: "get",
    collection: "adSpaces",
    authEnabled: true,
    allowedQueryParams: {
      default: [],
      role1: [],
      role2: [],
    },
    appendAggregate: (data) => {
      return [
        // { $match: { _id: ObjectId(data.variantId) } },
        {
          $set: {
            adId: {
              $toObjectId: "$adId",
            },
          },
        },
        {
          $lookup: {
            from: "ads",
            localField: "adId",
            foreignField: "_id",
            as: "ad",
          },
        },
        {
          $unwind: {
            path: "$ad",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $set: {
            urls: "$ad.urls",
            redirectUrl: "$ad.redirectUrl",
          },
        },

        { $unset: ["__v", "cOn", "mOn", "sizes", "ad", "adId", "_id"] },
      ];
    },
    customFunction: true,
    response: {},
  },
];

export default routes;
