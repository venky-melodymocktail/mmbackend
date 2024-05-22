
'use strict';

class Schema {
    name = "citylist"

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
        label:String,
        title:String,
        country:String,
        countrycode:String,
        statecode:String,
        state:String,
        city:String,
        zipcode:String,
        latitude:String,
        longitude:String,
        citystatecodeurl:String,
        metrourl:String
    }

}
const appSchema = new Schema()
export default appSchema