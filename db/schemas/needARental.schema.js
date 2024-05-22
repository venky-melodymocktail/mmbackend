'use strict';
// import { Schema } from 'mongoose';

class Schema {
    name = "needARental"

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
            
        },
        stayLeaseType:String,
        availabilityFrom:Date,
        availabilityTo:Date,
        neededBy:String,
        noOfPeople:String,
        attachedBath:Boolean,
        preferedGender:String,
        preferredRent:String,
        negotiable:Boolean,
        hiderent:Boolean,
        pricemode:String,
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
        userId:String,
        promotion:{
            status:String,
            promotionFrom:Date,
            promotionTo:Date
        },
        status:String,

    }

}
const appSchema = new Schema()
export default appSchema