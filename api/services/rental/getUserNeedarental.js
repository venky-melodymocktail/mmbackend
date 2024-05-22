var defaultCollection = "needARental";
var defaultModel = MODELS[defaultCollection].model;

const getUserNeedarental = async (req, res) => {
  try {
    var userId = req.query.userId;

    var zipcode = req.query.zipcode;
    var limit = Number(req.query.limit);
    var totalCount = 0; //await defaultModel.find({ status: "active" }).count()
    var skip = Number((req.query.page - 1) * req.query.limit);
    var data = null;

    var expiryPipeline = [
      {
        $match: {
          status: "active",
          cOn: { $lt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $sort: {
          cOn: -1,
        },
      },
    ];

    var expiriedneedArental = await defaultModel.aggregate(expiryPipeline);
    // res.send(expiriedneedArental);
    // return;

    if (expiriedneedArental.length > 0) {
      for (var i = 0; i < expiriedneedArental.length; i++) {
        var data = await defaultModel.updateMany(
          { _id: expiriedneedArental[i]._id },
          { $set: { status: "Expired" } }
        );
      }
    }
    // res.send(expiriedneedArental);
    // return;

    var sortObj = {
      "promotion.status": -1,
      distance: 1,
      cOn: -1,
    };

    if (req.query.posting) {
      if (req.query.posting == "Newest to Oldest") {
        sortObj = {
          cOn: -1,
        };
      } else {
        sortObj = {
          cOn: 1,
        };
      }
    }

    // var type = req.query.type ||""
    var filters = {
      status: "active",
    };

    if (req.query.search && req.query.search.length > 1) {
      var search = req.query.search;
      filters = {
        $or: [
          {
            "zipCode.city": {
              $regex: search,
              $options: "i",
            },
          },
          {
            "zipCode.state": {
              $regex: search,
              $options: "i",
            },
          },
          {
            title: {
              $regex: search,
              $options: "i",
            },
          },
          {
            "zipCode.zipcode": {
              $regex: search,
              $options: "i",
            },
          },
        ],
        status: "active",
      };
    }

    if (req.query.distance) {
      var miles = req.query.distance.split(" ");
      var km = Number(miles[0]) * 1.6;
      filters["distance"] = {
        $lte: km,
      };
    }

    if (req.query.rentalType) {
      filters["rentalType"] = req.query.rentalType;
    }

    if (req.query.type) {
      filters["type"] = req.query.type;
    }

    if (req.query.leaseType) {
      filters["stayLeaseType"] = req.query.leaseType;
    }

    if (req.query.noOfPeople) {
      filters["noOfPeople"] = req.query.noOfPeople;
    }
    if (req.query.attachedBath) {
      filters["attachedBath"] = req.query.attachedBath == "Yes" ? true : false;
    }
    if (req.query.preferedGender) {
      filters["preferedGender"] = req.query.preferedGender;
    }
    if (req.query.priceMode) {
      filters["pricemode"] = req.query.priceMode;
    }
    // if(req.query.paymentTerm){
    //     filters['preferredRent'] = req.query.paymentTerm
    // }
    if (req.query.amenities) {
      filters["amenities"] = { $in: [req.query.amenities] };
    }
    if (req.query.smokingPolicy) {
      filters["smokingPolicy"] = req.query.smokingPolicy;
    }
    if (req.query.petFriendly) {
      filters["petFriendly"] = req.query.petFriendly;
    }
    // if(req.query.minprice){
    //     filters['preferredRent'] = {
    //         '$gte': minprice
    //       }
    // }
    // {
    // var leaseType = req.query.leaseType
    // var noOfPeople = Number(req.query.noOfPeople)
    // var amenities = req.query.amenities || ""
    // var smokingPolicy = req.query.smokingPolicy || ""
    // var petFriendly = req.query.petFriendly || ""
    // var priceNode = req.query.petFriendly
    // var sortings =

    // aggregateOperation
    if (zipcode) {
      var zipcodeInfo = await MODELS["zipcodes"].model.find({ zip: zipcode });
      var location = {
        type: "Point",
        coordinates: [Number(zipcodeInfo[0].lng), Number(zipcodeInfo[0].lat)],
      };
      // var totalCount = data.length
      let pipeLine = [
        {
          $geoNear: {
            near: location,
            distanceField: "distance",
            key: "zipCode.location",
            spherical: true,
            distanceMultiplier: 0.001,
          },
        },
        {
          $set: {
            userId: {
              $toObjectId: "$userId",
            },
            serviceId: { $toString: "$_id" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetail",
          },
        },
        {
          $sort: sortObj,
        },
        {
          $match: filters,
        },

        {
          $lookup: {
            from: "bookmarks",

            let: { userId: userId, bookmarkedObjectId: "$serviceId" },
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
      ];
      data = await defaultModel.aggregate([
        ...pipeLine,
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $unset: ["__v", "mOn", "email", "contactNumber", "userDetail"],
        },
      ]);
      totalCount = await defaultModel.aggregate(pipeLine);
      totalCount = totalCount.length;
    }

    res.send([
      {
        result: data,
        count: {
          totalCount: totalCount,
        },
      },
    ]);
    // res.send(data)
    // res.send({"totalPage":Math.ceil(totalCount/req.query.limit), "result":data})
    // res.send({"totalPage":typeof(req.query.attachedBath), "result":data})
  } catch (error) {
    res.send(error);
  }
};

export default getUserNeedarental;
