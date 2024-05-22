'use strict';

class Schema {
    name = "visafaqs"

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
        question:String,
        category:String,
        answer:String,
        status:String,
        pinned:Boolean,
        createdBy:String
        
    }

}
const appSchema = new Schema()
export default appSchema