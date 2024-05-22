'use strict';

class Schema {
    name = "needAride"

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
        from: {
            type: String,
        },
        to: {
            type: String
        },
        price: {
            type: Number
        },
        dateOfJourney: {
            type: Date
        },
        postedBy: {
            type: String
        },
        adType: {
            type: String
        },
        spotAvailable: {
            type: Number
        },
        address: {
            city: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            }
        },
        createdBy: String,
        zipCode: String,
        phone: String,
        email: String,
        promotion: {
            status: String,
            promotionFrom: Date,
            promotionTo: Date
        },
    }

}
const appSchema = new Schema()
export default appSchema