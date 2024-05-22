'use strict';
// import { Schema } from 'mongoose';

class Schema {
    name = "home"

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
        type: String,
        exactAddress: String,
        zipCode: {
            city: String,
            state: String,
            zipcode: String,
            location: {}
        },
        stayLeaseType: String,
        availabilityFrom: Date,
        availabilityTo: Date,
        noOfPeople: String,
        // utilityRequired:Boolean,
        utilities: [String],
        roomFurnishingRequired: String,
        amenities: [String],
        vegPreference: String,
        smokingPolicy: String,
        petFriendly: String,
        Age: Number,
        occupation: String,
        // languages:[String],
        title: String,
        description: String,
        name: String,
        email: String,
        contactNumber: String,
        preferredRent: String,
        priceMode: String,
        files: [],
        // address:{
        //     city:String,
        //     State:String,
        //     Country:String
        // },
        promotion: {
            status: String,
            promotionFrom: Date,
            promotionTo: Date
        },
        status: String,
        userId: String
    }

}
const appSchema = new Schema()
export default appSchema