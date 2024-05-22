'use strict';

class Schema {
    name = "blogCategory"

    data = {
        
        "cOn": {
            type: Date,
            default: Date.now
        },
        "mOn": {
            type: Date,
            default: Date.now
        },
        category:String,
        status:String,
        files:[],
        

    }

}
const appSchema = new Schema()
export default appSchema