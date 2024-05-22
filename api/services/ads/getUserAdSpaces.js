import settings from "../../../config/settings.json" assert { type: "json" };
// let settings = require("../../../config/settings.json")
var defaultCollection = "adSpaces";
var defaultModel = MODELS[defaultCollection].model;

const getUserAdSpaces = async (req, res) => {
  try {
    let adSpaces = [];

    res.send;

    var pipeLine1 = [
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
        $match: {
          "ad.expiresOn": {
            $lte: new Date(),
          },
        },
      },
    ];

    var expiredAds = await defaultModel.aggregate(pipeLine1);
    // res.send(expiredAds);
    // return;

    if (expiredAds.length > 0) {
      for (var i = 0; i < expiredAds.length; i++) {
        var obj = {
          redirectUrl: "",
          expiresOn: null,
          urls: {
            lg: "https://melodymocktail.blob.core.windows.net/website/mmAwsImagesBucket/65b99aec-57f6-44c1-9489-0ea107760578.jpeg",
            md: "https://melodymocktail.blob.core.windows.net/website/mmAwsImagesBucket/65b99aec-57f6-44c1-9489-0ea107760578.jpeg",
            sm: "https://melodymocktail.blob.core.windows.net/website/mmAwsImagesBucket/65b99aec-57f6-44c1-9489-0ea107760578.jpeg",
            xs: "https://melodymocktail.blob.core.windows.net/website/mmAwsImagesBucket/65b99aec-57f6-44c1-9489-0ea107760578.jpeg",
          },
        };
        var data = await MODELS["ads"].model.updateMany(
          { _id: expiredAds[0].ad._id },
          { $set: obj }
        );
      }
    }

    // adSpaces = await defaultModel.aggregate(pipeLine1);

    let pipeLine = [
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

      // { $unset: ["__v", "cOn", "mOn", "sizes", "ad", "adId", "_id"] },
    ];
    adSpaces = await defaultModel.aggregate(pipeLine);

    // let data = {
    //   adSpaces: adSpaces,
    //   settings: settings
    // }
    res.send(adSpaces);
  } catch (error) {
    res.send(error);
  }
};

export default getUserAdSpaces;
