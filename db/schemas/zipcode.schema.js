'use strict';

class Schema {
    name = "zipcodes"

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
        zip:String,
        lat:String,
        lng:String,
        city:String,
        state_name:String,
        country:String
    }

}
const appSchema = new Schema()
export default appSchema