'use strict';

class Schema {
    name = "orders"

    data = {
        rzpId: String,
        stripeId: String,
        otherData: Object,
        status: String,
        type: String,
        processed: {
            type: Boolean,
            default: false
        },

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