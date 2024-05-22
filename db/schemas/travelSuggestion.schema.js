'use strict';

class Schema {
    name = "travelSuggestion"

    data = {
        title:{
            type:String
        },
        // pluginIds: Array,
        "cOn": {
            type: Date,
            default: Date.now
        },
        "mOn": {
            type: Date,
            default: Date.now
        },
        description: {
            type:String
        },
        image:{
            url:{
                type:String
            }
        },
        country:{
            type:String
        },
        category:{
            type:String
        },
        createdBy:String
    }

}
const appSchema = new Schema()
export default appSchema