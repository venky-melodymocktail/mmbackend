'use strict';
// import { Schema } from 'mongoose';

class Schema {
    name = "expert"

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
        name:String,
        email:String,
        phone:String,
        category:String,
        status:String,
        slots:{
            
        },
        bookingsCount:Number
    }

}
const appSchema = new Schema()
export default appSchema