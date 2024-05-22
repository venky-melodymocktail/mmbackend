'use strict';

class Schema {
    name = "movieSuggestion"
    data = {
        title: String,
        // pluginIds: Array,
        "cOn": {
            type: Date,
            default: Date.now
        },
        "mOn": {
            type: Date,
            default: Date.now
        },
        genre:String,
        rating:String,
        availableOn:[String],
        image:{
            
        },
        language:String, //arr
        category:String, //arr
        description:String,
        trailerURL:String,
        country:String,
        status:String
    }

}
const appSchema = new Schema()
export default appSchema