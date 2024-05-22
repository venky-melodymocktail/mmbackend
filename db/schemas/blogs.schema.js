'use strict';

class Schema {
    name = "blogs"

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
        blogType:String,
        title:String,
        description: {},
        createdBy:String,
        // images:[
        //     {
        //         url:String
        //     }
        // ],
        image:{},
        travelType:String,
        destination:String,
        status:String,
        pinned:Boolean
        
    }

}
const appSchema = new Schema()
export default appSchema