'use strict';

class Schema {
    name = "bookmarks"

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
        // BlogId:String,
        serviceType:String,
        bookmarkedObjectId:String,
        // description: String,
        userId:String,
        
        // detail:[Object]s
    }

}
const appSchema = new Schema()
export default appSchema