'use strict';

class Schema {
    name = "rides"

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
        from: {
            city: String,
            state: String,
            zipcode: String,
            location: {}
        },
        to: {
            city: String,
            state: String,
            zipcode: String,
            location: {}
        },
        price: {
            type: String
        },
        dateOfJourney: {
            type: String
        },
        postedBy: {
            type: String
        },
        adType: {
            type: String
        },
        spotAvailable: {
            type: Number
        },
        city: String,
        state: String,
        counyty: String,
        postedBy: String,
        zipcode: String,
        contactNumber: String,
        email: String,
        time: String,
        timeNum: Number,
        gender: String,
        status: String,
        // phone:String,
        // email:String,
        userId: String,
        promotion: {
            status: Boolean,
            promotionFrom: String,
            promotionTo: String
        }
    }

}
const appSchema = new Schema()
export default appSchema