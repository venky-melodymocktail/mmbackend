var defaultCollection = "ads";
var defaultModel = MODELS[defaultCollection].model;

const postAdUpdate = async (req, res) => {
  try {
    var obj = {};
    obj.urls = req.body.urls;
    if (req.body.name) {
      obj.name = req.body.name;
    }
    obj.redirectUrl = req.body.redirectUrl;
    if (!obj.urls) {
      res.status(400).send({ message: "Bad Request" });
      return;
    }

    if (req.body.expiresOn) {
      obj.expiresOn = req.body.expiresOn;
    }
    // let newUrls = {};
    // for (var key in obj.urls) {
    //   newUrls[key] = obj.urls[key].replace(
    //     "https://melodymocktail.s3.ap-south-1.amazonaws.com/",
    //     "https://dgslk2men7iqd.cloudfront.net/"
    //   );
    // }
    // obj.urls = newUrls;

    var data = await defaultModel.updateMany(
      { _id: req.body.id },
      { $set: obj }
    );

    res.send(data);
    // res.send(data)
  } catch (error) {
    res.send(error);
  }
};

export default postAdUpdate;
