'use strict';

class Schema {
    name = "contactus"

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
        // BlogId:String,
        serviceType:String,
        serviceId:String,
        firstName:String,
        lastName:String,
        phone:String,
        message:String,
        captcha:String,
        userId:String,
        
        // detail:[Object]s
    }

}
const appSchema = new Schema()
export default appSchema