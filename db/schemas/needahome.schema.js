'use strict';
// import { Schema } from 'mongoose';

class Schema {
    name = "needahome"

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
        title:String,
        description:String,
        type:String,
        exactAddress:String,
        rentalType : String,
        zipCode:{
            city:String,
            state:String,
            zipcode:String,
            location:{ }
        },
        stayLeaseType:String,
        neededBy:String,
        noOfPeople:String,
        utilities:[String],
        roomFurnishingRequired:String,
        amenities:[String],
        // vegPreference:String,
        smokingPolicy:String,
        petFriendly:String,
        // Age:Number,
        // occupation:String,
        // languages:[String],
        
        name:String,
        email:String,
        contactNumber:String,
        // files:{
        //     url:String
        // },
        // address:{
        //     city:String,
        //     State:String,
        //     Country:String
        // },
        promotion:{
            status:String,
            promotionFrom:Date,
            promotionTo:Date
        },
        status:String,
        userId:String
    }

}
const appSchema = new Schema()
export default appSchema