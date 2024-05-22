'use strict';
// import { Schema } from 'mongoose';

class Schema {
    name = "bookings"

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
        type: String,
        orderData: Object,
        rzpId: String,
        stripeId: String,
        paymentStatus: {
            type: String,
            default: "pending"
        },
        otherDetails: Object,
        expertId: String,
        category: String,
        slot: Number,
        date: Date,
        userId: String,
        meetingDetails: Object,
    }

}
const appSchema = new Schema()
export default appSchema