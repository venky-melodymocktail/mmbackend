'use strict';

class Schema {
    name = "airports"

    data = {
        name: String,
        city_code:String,
        country_code : String,
        iata_code : String,
        icao_code : String,
        lat:Number,
        lng:Number,
        "cOn": {
            type: Date,
            default: Date.now
        },
        "mOn": {
            type: Date,
            default: Date.now
        }

    }

}
const appSchema = new Schema()
export default appSchema