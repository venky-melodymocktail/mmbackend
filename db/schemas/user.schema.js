'use strict';

class Schema {
    name = "users"

    data = {
        name: String,
        firstName: String,
        lastName: String,
        // pluginIds: Array,
        "cOn": {
            type: Date,
            default: Date.now
        },
        "mOn": {
            type: Date,
            default: Date.now
        },
        profilePic: [],
        phone: String,
        email: String,
        address: {
            city: String,
            state: String,
            country: String,
            zipCode: String
        },
        status: {
            type: String,
            default: 'active'
        }
    }

}
const appSchema = new Schema()
export default appSchema