'use strict';
// import { Schema } from 'mongoose';

class Schema {
    name = "blogcomments"

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
        comment:String,
        status:String,
        // blogId:Schema.Types.ObjectId

        blogId:String
    }

}
const appSchema = new Schema()
export default appSchema