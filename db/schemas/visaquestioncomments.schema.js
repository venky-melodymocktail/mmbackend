'use strict';
// import { Schema } from 'mongoose';

class Schema {
    name = "visaquestioncomments"

    data = {
        // name: String,
        // pluginIds: Array,
        "cOn": {
            type: Date,
            default: Date.now
        },
        "mOn": {
            type: Date,
            default: Date.now
        },
        userId:String,
        visaQuestionID:String,
        comment:String,
        status:String,
        reportCount:Number,
        // blogId:Schema.Types.ObjectId

        // blogId:String
    }

}
const appSchema = new Schema()
export default appSchema