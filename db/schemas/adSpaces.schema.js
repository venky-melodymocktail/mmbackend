'use strict';

class Schema {
    name = "adSpaces"

    data = {
        name: String,
        adId: String,
        sizes: {
            lg: {
                height: Number,
                width: Number,
            },
            md: {
                height: Number,
                width: Number,
            },
            sm: {
                height: Number,
                width: Number,
            },
            xs: {
                height: Number,
                width: Number,
            },
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