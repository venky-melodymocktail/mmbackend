"use strict";

class Schema {
  name = "ads";

  data = {
    name: String,
    status: {
      type: String,
      default: "disabled",
    },
    adSpaceId: String,
    urls: {
      lg: String,
      md: String,
      sm: String,
      xs: String,
    },
    redirectUrl: String,
    expiresOn: Date,
    cOn: {
      type: Date,
      default: Date.now,
    },
    mOn: {
      type: Date,
      default: Date.now,
    },
  };
}
const appSchema = new Schema();
export default appSchema;
