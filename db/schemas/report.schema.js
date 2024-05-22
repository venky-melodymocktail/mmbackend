'use strict';

class Schema {
    name = "report"

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
        reportType: String,  //name of the schema
        reportedId: String,
        reportedBy: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        resonOfReporting: String

    }

}
const appSchema = new Schema()
export default appSchema