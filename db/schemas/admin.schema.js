'use strict';

class Schema {
    name = "admin"

    data = {
        name: String,
        // pluginIds: Array,
        "cOn": {
            type: Date,
            default: Date.now
        },
        "mOn": {
            type: Date,
            default: Date.now
        },
        profilePic:{
            url:String
        },
        phone:String,
        email:String,
        // address:{
        //     city:String,
        //     state:String,
        //     country:String,
        //     zipCode:String
        // },

    }

}
const appSchema = new Schema()
export default appSchema