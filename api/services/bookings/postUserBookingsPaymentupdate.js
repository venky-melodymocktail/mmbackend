import { createMeeting, createOrder, sendEmail } from "../../../utils/neutrodev.js"

var defaultCollection = "bookings"
var defaultModel = MODELS[defaultCollection].model
var userModel = MODELS["users"].model


const postBookingsPaymentupdate = async (req, res) => {


    try {


        let bookingId = req.body.bookingId
        let paymentStatus = req.body.paymentStatus;
        if (paymentStatus != 'success') {
            res.status(400).send({ message: "Bad Request" })
        }
        console.log(req.body, 'body')
        //check if booking exists
        var booking = await defaultModel.findOne({ _id: bookingId });
        if (!booking) {
            res.status(400).send({ message: "Bad Request" });
            return
        }
        var bookingTime = new Date(booking.date)
        bookingTime.setHours(booking.slot)
        var user = await userModel.findOne({ _id: booking.orderData.userId })
        const toEmail = user.email
        const meetingDetails = await createMeeting("Melody Mocktail Expert Booking", booking.category, 60, bookingTime, 'dsvk1996@gmail.com', toEmail)
        const hour = booking.slot
        const emailData = {
            name: user.name,
            date: booking.date,
            time: ((hour + 11) % 12 + 1) + (hour < 12 ? "am" : "pm"),
            meetJoinLink: meetingDetails.join_url,
            expertName: "Melody Mocktail"
        }
        sendEmail("alerts@melodymocktail.com", toEmail, 'Melody Mocktail Booking Sucessfull!', 'MeetingScheduled', emailData)
        var data = await defaultModel.updateMany({ _id: bookingId }, { paymentStatus: 'success', meetingDetails: meetingDetails })

        res.send(data)

    } catch (error) {
        console.log(error.message)
        res.send(error)
    }


}



export default postBookingsPaymentupdate