"use strict";

class Schema {
  name = "visaqandas";

  data = {
    // name: String,
    // pluginIds: Array,
    cOn: {
      type: Date,
      default: Date.now,
    },
    mOn: {
      type: Date,
      default: Date.now,
    },
    question: String,
    category: String,
    status: String,
    // pinned:Boolean,
    createdBy: String,
    bookmarkCount: Number,
    reportCount: Number,
    commentCount: Number,
    answered: Boolean,
    answers: String,
    answeredOn: Date,
  };
}
const appSchema = new Schema();
export default appSchema;
