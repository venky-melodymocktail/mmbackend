'use strict';

class Schema {
    name = "images"

    data = {
        name: String,
        url: String,

        "cOn": {
            type: Date,
            default: Date.now
        },
        "mOn": {
            type: Date,
            default: Date.now
        }

    }

}
const appSchema = new Schema()
export default appSchema