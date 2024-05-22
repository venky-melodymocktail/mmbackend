'use strict';
// import { Schema } from 'mongoose';

class Schema {
    name = "rooms"

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
        availabilityFrom:Date,
        availabilityTo:Date,
        noOfPeople:String,
        attachedBath:Boolean,
        preferedGender:String,
        preferedRent:String,
        priceMode:String,
        negotiable:Boolean,
        utilityRequired:Boolean,
        utilities:[String],
        roomFurnishingRequired:String,
        amenities:[String],
        vegPreference:String,
        smokingPolicy:String,
        petFriendly:String,
        Age:Number,
        occupation:String,
        languages:[String],
        title:String,
        description:String,
        name:String,
        email:String,
        contactNumber:String,
        files:[],
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
        userId:String,
        status:String,

    }

}
const appSchema = new Schema()
export default appSchema