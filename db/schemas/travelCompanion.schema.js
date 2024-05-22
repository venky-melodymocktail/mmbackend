'use strict';

class Schema {
    name = "travelCompanion"

    data = {
        // name: String,
        // pluginIds: Array,
        firstName: String,
        lastName:String,
        // pluginIds: Array,
        "cOn": {
            type: Date,
            default: Date.now
        },
        "mOn": {
            type: Date,
            default: Date.now
        },
        ticketBooked: String,
        from:{},
        to:{},
        stops:[String],
        dateOfJourrney:String,
        fromDate:String,
        toDate:String,
        timeOfJourney:String,
        airline:String,
        preferredAirline:[String],
        email:String,
        phone:String,
        languageKnown:[String],
        vaccinated:String,
        tip:Number,
        status:String,
        promotion:{
            status:Boolean,
            promotionFrom:String,
            promotionTo:String
        },
        userId:String

    }

}
const appSchema = new Schema()
export default appSchema