var defaultCollection = "travelCompanion";
var defaultModel = MODELS[defaultCollection].model;

const getTravelCompanion = async (req, res) => {
  try {
    var userId = req.query.userId;
    if (!userId) {
      userId = "test";
    }

    var zipcode = req.query.zipcode;
    var limit = Number(req.query.limit);
    // var totalCount = await defaultModel.find().count()
    var skip = Number((req.query.page - 1) * req.query.limit);
    var data = null;
    var totalCount = 0; //await defaultModel.find({ status: "active" }).count()

    var latest = req.query.latest;

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

    var expiriedTc = await defaultModel.aggregate(expiryPipeline);
    // res.send(expiriedneedArental);
    // return;

    if (expiriedTc.length > 0) {
      for (var i = 0; i < expiriedTc.length; i++) {
        var data = await defaultModel.updateMany(
          { _id: expiriedTc[i]._id },
          { $set: { status: "expired" } }
        );
      }
    }

    // var type = req.query.type ||""
    let tip = req.query.tip;
    let tipSort = [];
    if (tip == "Highest to Lowest") {
      tipSort = [
        {
          $sort: {
            "promotion.status": -1,

            tip: -1,
            cOn: -1,
          },
        },
      ];
    } else if (tip == "Lowest to Highest") {
      tipSort = [
        {
          $sort: {
            "promotion.status": -1,

            tip: 1,
            cOn: -1,
          },
        },
      ];
    } else {
      tipSort = [
        {
          $sort: {
            "promotion.status": -1,
            distance: 1,

            cOn: -1,
          },
        },
      ];
    }

    if (latest && latest == true) {
      tipSort = [
        {
          $sort: {
            cOn: -1,
          },
        },
      ];
    }

    var filters = {
      status: "active",
    };
    var mindistance = 0;
    if (req.query.mindistance) {
      mindistance = Math.floor(req.query.mindistance * 1609.34);
    }

    var maxdistance = Number.POSITIVE_INFINITY;
    if (req.query.maxdistance) {
      maxdistance = Math.floor(req.query.maxdistance * 1609.34);
    }

    if (req.query.language) {
      filters["languageKnown"] = { $in: [req.query.language] };
    }

    // if(req.query.noOfPeople){
    //     filters['noOfPeople'] = Number(req.query.noOfPeople)
    // }
    if (req.query.airline) {
      filters["airline"] = req.query.airline;
    }

    if (req.query.ticketBooked) {
      filters["ticketBooked"] = req.query.ticketBooked;
    }

    if (req.query.vaccinated) {
      filters["vaccinated"] = req.query.vaccinated;
    }

    // if (req.query.fromdate || req.query.todate) {
    //   filters["dateOfJourrney"] = {
    //     $gte: ISODate(req.query.fromdate),
    //     $lte: ISODate(req.query.todate)
    //   }
    // }
    if (req.query.fromDate) {
      filters["tempFromDate"] = {
        $gte: new Date(req.query.fromDate).toISOString(),
      };
    }
    if (req.query.toDate) {
      filters["tempToDate"] = {
        $lte: new Date(req.query.toDate).toISOString(),
      };
    }

    if (req.query.cOnDate) {
      filters["tempcOnDate"] = {
        $gte: new Date(req.query.cOnDate).toISOString(),
      };
    }

    console.log(filters);

    if (req.query.toAirport) {
      filters["to.city_code"] = req.query.toAirport;
    }

    // aggregateOperation
    if (zipcode) {
      var zipcodeInfo = await MODELS["zipcodes"].model.find({ zip: zipcode });
      let lat = Number(zipcodeInfo[0].lat);
      let lng = Number(zipcodeInfo[0].lng);
      if (req.query.fromAirport) {
        var fromAirport = await MODELS["airports"].model.findOne({
          iata_code: req.query.fromAirport,
        });
        lat = fromAirport.lat;
        lng = fromAirport.lng;

        // delete filters['from.city_code']
      }
      var location = {
        type: "Point",
        coordinates: [lng, lat],
      };
      if (req.query.lng && req.query.lat) {
        location = {
          type: "Point",
          coordinates: [Number(req.query.lng), Number(req.query.lat)],
        };
      }

      // var totalCount = data.length
      let pipeline = [
        {
          $geoNear: {
            near: location,
            distanceField: "distance",
            key: "from.location",
            spherical: true,
            distanceMultiplier: 0.001,
            maxDistance: maxdistance,
            minDistance: mindistance,
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
          $addFields: {
            tempFromDate: {
              $cond: {
                if: { $ne: ["$dateOfJourrney", ""] }, // Check if 'dateOfJourrney' is not empty
                then: "$dateOfJourrney", // Set 'dateOfJourrney' as 'tempFromDate'
                else: "$fromDate", // Set 'oldName' as 'fromDate'
              },
            },
            tempToDate: {
              $cond: {
                if: { $ne: ["$dateOfJourrney", ""] }, // Check if 'dateOfJourrney' is not empty
                then: "$dateOfJourrney", // Set 'dateOfJourrney' as 'tempFromDate'
                else: "$toDate", // Set 'oldName' as 'toDate'
              },
            },
            tempcOnDate: "$cOn",
          },
        },
        {
          $set: {
            tempcOnDate: { $toString: "$tempcOnDate" },
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
          $sort: tipSort[0].$sort,
        },

        {
          $match: filters,
        },
      ];
      // console.log(JSON.stringify(pipeline))
      data = await defaultModel.aggregate([
        ...pipeline,
        {
          $skip: skip,
        },
        {
          $limit: limit,
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
        {
          $unset: ["__v", "mOn", "email", "phone", "userDetail"],
        },
        ...tipSort,
      ]);
      totalCount = await defaultModel.aggregate(pipeline);
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
    // res.send({"totalPage":typeof(req.query.attachedBath), "result":data})
  } catch (error) {
    res.send(error);
  }
};

export default getTravelCompanion;
