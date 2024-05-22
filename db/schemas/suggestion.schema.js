'use strict';

class Schema {
    name = "suggestion"

    data = {
        
        "cOn": {
            type: Date,
            default: Date.now
        },
        "mOn": {
            type: Date,
            default: Date.now
        },
        "key": String,
        suggestion:String,
        selected:Boolean

    }

}
const appSchema = new Schema()
export default appSchema