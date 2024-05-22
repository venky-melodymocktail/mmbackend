import { createOrder } from "../../../utils/neutrodev.js"
import settings from '../../../config/settings.json' assert { type: "json" };

var defaultCollection = "bookings"
var defaultModel = MODELS[defaultCollection].model
const expertModel = MODELS['expert'].model
const MAX_GROUP_SIZE = 3

const postBookingsCreate = async (req, res) => {


    try {


        //get date, slot
        //find all experts who are available on that date, slot
        //remove experts who have a booking at that date,slot
        //choose an expert with least bookings and book the slot 


        let date = new Date(req.body.date);
        let slot = req.body.slot;
        let category = req.body.category;
        let type = req.body.type.toLowerCase();
        let otherDetails = req.body.otherDetails
        let paymentPlatform = req.body.paymentPlatform

        console.log(paymentPlatform, 'paymentPlatform')
        if (!paymentPlatform) {
            paymentPlatform = 'rzp'
        }

        const currentDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = daysOfWeek[currentDate.getDay()].toLowerCase();
        let expertQuery = {}
        expertQuery['slots.' + day] = slot
        expertQuery['category'] = category

        let amount = 10000;
        let allExperts = []
        if (type == "single") {
            allExperts = await getAllExpertsForSingleBooking(date, slot, category)
            // amount = 200000
            if (category == 'Visa & Immigration') {
                amount = settings.pricing.slotBooking.visaQna.single.inr * 100
            } else {
                amount = settings.pricing.slotBooking.studyAbroad.single.inr * 100

            }
        } else if (type == "group") {
            allExperts = await getAllExpertsForGroupBooking(date, slot, category)
            // amount = 60000

            if (category == 'Visa & Immigration') {
                amount = settings.pricing.slotBooking.visaQna.group.inr * 100
            } else {
                amount = settings.pricing.slotBooking.studyAbroad.group.inr * 100

            }

        } else {
            res.status(400).send({ message: "Bad Request" })
        }
        if (allExperts.length == 0) {
            response = {
                message: "Error No Expert Found"
            }
            res.send(response)
        }

        let expert = allExperts[0]



        var userId = req.authInfo._id// '6446c1f4184116859686b24f'
        var result

        if (paymentPlatform == 'rzp') {
            result = await createOrder(userId, amount)
        } else {
            result = await createOrder(userId, amount, 'stripe')

        }

        let booking = {
            expertId: expert._id,
            category: category,
            slot: slot,
            date: currentDate,
            type: type,
            paymentPlatform: paymentPlatform,
            rzpId: result.orderId,
            stripeId: result.clientSecret,
            orderData: result,
            otherDetails: otherDetails,
            userId: req.authInfo._id


        }

        booking.orderData["userId"] = userId
        booking.orderData["total"] = amount

        console.log(booking, 'booking')
        var response = {}

        var data = await defaultModel.create(booking)
        await expertModel.updateOne({ _id: expert._id }, { $inc: { bookingsCount: 1 } })
        setTimeout(() => {
            validatePayment(data._id)
        }, 90000);
        res.send(data)

    } catch (error) {
        console.log(error)
        res.send(error)
    }


}

export const getAllExpertsForSingleBooking = async (date, slot, category) => {


    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = daysOfWeek[currentDate.getDay()].toLowerCase();
    let expertQuery = {}
    expertQuery['slots.' + day] = slot
    expertQuery['category'] = category
    // let allExperts = await expertModel.find(expertQuery)
    let allExperts = await expertModel.aggregate([
        {
            '$match': expertQuery
        }, {
            '$lookup': {
                'from': 'bookings',
                'let': {
                    'expertId': {
                        '$toString': '$_id'
                    }
                },
                'pipeline': [
                    {
                        '$match': {
                            'date': currentDate,
                            'slot': slot,
                            '$expr': {
                                '$eq': [
                                    '$$expertId', '$expertId'
                                ]
                            }
                        }
                    }
                ],
                'as': 'bookings'
            }
        },
        {
            '$addFields': {
                'isBooked': {
                    '$size': '$bookings'
                }
            }
        }, {
            '$match': {
                'isBooked': 0
            }
        }, {
            '$sort': {
                'bookingsCount': 1
            }
        }
    ])

    return allExperts
}

export const getAllExpertsForGroupBooking = async (date, slot, category) => {

    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = daysOfWeek[currentDate.getDay()].toLowerCase();
    let expertQuery = {}
    expertQuery['slots.' + day] = slot
    expertQuery['category'] = category
    // let allExperts = await expertModel.find(expertQuery)
    let allExperts = await expertModel.aggregate([
        {
            '$match': expertQuery
        }, {
            '$lookup': {
                'from': 'bookings',
                'let': {
                    'expertId': {
                        '$toString': '$_id'
                    }
                },
                'pipeline': [
                    {
                        '$match': {
                            'date': currentDate,
                            'slot': slot,
                            '$expr': {
                                '$eq': [
                                    '$$expertId', '$expertId'
                                ]
                            }
                        }
                    }
                ],
                'as': 'bookings'
            }
        },
        {
            '$addFields': {
                isSingle: {
                    $cond: [
                        { $eq: [{ $arrayElemAt: ["$bookings.type", 0] }, "single"] },
                        true,
                        false
                    ]
                },
                'isBooked': {
                    '$size': '$bookings'
                }
            }
        }, {
            '$match': {
                isSingle: false,
                isBooked: { $lt: MAX_GROUP_SIZE },
            }
        }, {
            '$sort': {
                'bookingsCount': 1
            }
        }
    ])

    return allExperts

}

const validatePayment = async (bookingId) => {
    var data = await defaultModel.findOne({ _id: bookingId })
    if (data) {
        if (data.paymentStatus != "success") {
            let expertId = data.expertId
            await defaultModel.remove({ _id: bookingId })
            await expertModel.updateOne({ _id: expertId }, { $inc: { bookingsCount: -1 } })

        }
    } else {
        return
    }


}

export default postBookingsCreate