var defaultCollection = "rides"
var defaultModel = MODELS[defaultCollection].model


const getUserRideSharing = async (req, res) => {

  try {
    var userId = req.query.userId
    if (!userId) {
      userId = 'test'
    }
    var zipcode = req.query.zipcode;
    var limit = Number(req.query.limit)
    var totalCount = 0// await defaultModel.find({ adType: 'offered' }).count()
    var skip = Number((req.query.page - 1) * (req.query.limit))
    var spotAvailable = Number(req.query.spotAvailable)
    var data = null
    // var minprice = Number(req.query.minPrice) || 0
    // var maxprice = Number(req.query.maxPrice) || Number.POSITIVE_INFINITY
    let rideDate = req.query.rideDate;
    let rideFilter = {}
    if (rideDate) {
      rideFilter = {
        dateOfJourney: rideDate
      }
    }
    var spotAvailable = req.query.spotAvailable;
    let spotFilter = {}
    if (!isNaN(spotAvailable)) {
      spotAvailable = Number(spotAvailable)
      spotFilter = {
        spotAvailable: spotAvailable
      }
      if (spotAvailable >= 4) {
        spotFilter = {
          spotAvailable: { $gte: 4 }
        }
      }

      

    }

    if(spotAvailable<1){
      spotFilter = {
        spotAvailable: { $gte: 1 }
      }
    }
    
    // var maxspotAvailable = Number(req.query.maxspotAvailable) || Number.POSITIVE_INFINITY
    var range = 0
    if (req.query.range == "des") {
      range = -1
    }
    else if (req.query.range == "asc") {
      range = 1
    }
    var minPrice = req.query.minPrice || 0;
    var maxPrice = req.query.maxPrice;
    let priceFilter = {}
    if (maxPrice > 0) {
      priceFilter = {
        price: { $gte: Number(minPrice), $lt: Number(maxPrice) }
      }

    }
    var time = req.query.time || String
    let timeFilter = {}
    if (time == 'Morning (6 to 12PM)') {
      timeFilter = {

        timeNum: { $gte: 6, $lt: 12 }

      }

    } else if (time == 'Afternoon (12PM-6PM)') {
      timeFilter = {

        timeNum: { $gte: 12, $lt: 18 }

      }

    } else if (time == 'Evening (After 6PM)') {
      timeFilter = {

        timeNum: { $gte: 18, $lt: 24 }

      }

    }
    let sortObj = {

      'promotion.status': -1,

      'distance': 1,


      'cOn': -1,
    }
    if (range != 0) {
      sortObj = {
        'promotion.status': -1,

        price: range,

        'cOn': -1,


      }
    }
    // var range = Number(req.query.maxspotAvailable) || 


    // aggregateOperation
    if (zipcode) {
      var zipcodeInfo = await MODELS["zipcodes"].model.find({ zip: zipcode })
      var location = { type: 'Point', coordinates: [Number(zipcodeInfo[0].lng), Number(zipcodeInfo[0].lat)] }
      let pipeline = [
        {
          '$geoNear': {
            'near': location,
            'distanceField': 'distance',
            'key': 'from.location',
            'spherical': true,
            'distanceMultiplier': 0.001
          }
        },
        {
          '$set': {
            'userId': {
              '$toObjectId': '$userId'
            },
            'serviceId': { '$toString': "$_id" }

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
          '$sort': {

            'distance': 1,

          }
        },
        {
          '$project': {
            '_id': '$_id',
            'from': '$from',
            'to': '$to',
            'price': {
              '$toInt': '$price'
            },
            'dateOfJourney': '$dateOfJourney',
            'adType': '$adType',
            'spotAvailable': '$spotAvailable',
            'city': '$city',
            'state': '$state',
            'zipcode': '$zipcode',
            'cOn': '$cOn',
            'mOn': '$mOn',
            'promotion': '$promotion',
            'distance': '$distance',
            'status': '$status',
            'time': '$time',
            'userId': '$userId',
            'userDetail': '$userDetail',
            'timeNum': '$timeNum',
            'serviceId': "$serviceId",
            'postedBy':"$postedBy"
          }
        },
        // { ...timeFilter },
        {
          '$match': {
            '$and': [
              { ...timeFilter },
              { ...priceFilter },
              { ...rideFilter },
              {
                'adType': 'offered'
              },
              { ...spotFilter }
              ,

              {
                "status": "active"
              },

            ],

          }
        },
        {
          '$lookup': {
            from: "bookmarks",

            let: { userId: userId, bookmarkedObjectId: "$serviceId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$userId", "$$userId"] },
                      { $eq: ["$bookmarkedObjectId", "$$bookmarkedObjectId"] }
                    ]
                  }
                }
              }
            ],
            as: "matchedBookmarks"

          }
        },
        {
          $addFields: {
            isBookmarked: {
              $cond: {
                if: { $gt: [{ $size: "$matchedBookmarks" }, 0] },
                then: true,
                else: false
              }
            }
          }
        }










      ]
      let pipeline1 = [...pipeline, {
        '$skip': skip
      },
      {
        '$limit': limit
      },

      {
        '$sort': sortObj
      },
      {
        '$unset': [
          
          '__v',
          'mOn',
          'email',
          'contactNumber',
          'userDetail'
        ]
      }

      ]
      console.log(JSON.stringify(pipeline1))
      data = await defaultModel.aggregate(pipeline1)
      totalCount = await defaultModel.aggregate([...pipeline])
      totalCount = totalCount.length
      // data = result
    }


    res.send([
      {
        "result": data,
        "count": {
          "totalCount": totalCount
        }
      }
    ])
    // res.send(data)

  } catch (error) {
    res.send(error)
  }


}

export default getUserRideSharing