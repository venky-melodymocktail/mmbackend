import 'dotenv/config'
import config from './config/index.js'
global.configs = config;

import dbManager from "./db/dbManager.js";


const services = {
    home: {
        endDate: "availabilityTo"
    },
    rooms: {
        endDate: "availabilityTo"
    },
    needaroom: {
        endDate: "availabilityTo"
    }
}

let currentDate = new Date();

let run = async () => {
    var dbMgr = new dbManager()
    await dbMgr.loadSchemas()

    let models = dbMgr.models;

    let homeModel = models['home'].model
    let needahomeModel = models['needahome'].model
    let roomModel = models['rooms'].model
    let needaroomModel = models['needaroom'].model
    let ridesModel = models['rides'].model

    let tcModel = models['travelCompanion'].model
    let willbeatcModel = models['willBeATravelCompanion'].model
    // console.log(Object.keys(dbMgr.models))
    // console.log(currentDate.toISOString())

    let data

    //expiring homes offered
    data = await homeModel.updateMany({ availabilityTo: { $lt: currentDate } }, { status: "expired" })

    //expiring rooms offerd
    data = await roomModel.updateMany({ availabilityTo: { $lt: currentDate } }, { status: "expired" })

    //expiring rooms wanted
    data = await needaroomModel.updateMany({ availabilityTo: { $lt: currentDate } }, { status: "expired" })

    //expiring tc wanted
    data = await tcModel.updateMany({ ticketBooked: 'no', toDate: { $lt: currentDate.toISOString() } }, { status: "expired" })
    data = await tcModel.updateMany({ ticketBooked: 'yes', dateOfJourrney: { $lt: currentDate.toISOString() } }, { status: "expired" })

    //expiring tc offered
    data = await willbeatcModel.updateMany({ ticketBooked: 'no', toDate: { $lt: currentDate.toISOString() } }, { status: "expired" })
    data = await willbeatcModel.updateMany({ ticketBooked: 'yes', dateOfJourrney: { $lt: currentDate.toISOString() } }, { status: "expired" })

    //expiring promotion for home
    data = await homeModel.updateMany({ "promotion.promotionTo": { $lt: currentDate } },
        { $set: { "promotion.status": false, "promotion.promotionTo": "", "promotion.promotionFrom": "" } })


    //expiring promotion for needahome
    data = await needahomeModel.updateMany({ "promotion.promotionTo": { $lt: currentDate } },
        { $set: { "promotion.status": false, "promotion.promotionTo": "", "promotion.promotionFrom": "" } })



    //expiring promotion for room
    data = await roomModel.updateMany({ "promotion.promotionTo": { $lt: currentDate } },
        { $set: { "promotion.status": false, "promotion.promotionTo": "", "promotion.promotionFrom": "" } })


    //expiring promotion for needaroom
    data = await needaroomModel.updateMany({ "promotion.promotionTo": { $lt: currentDate } },
        { $set: { "promotion.status": false, "promotion.promotionTo": "", "promotion.promotionFrom": "" } })

    //expiring promotion for rides(wanted and offered)
    data = await ridesModel.updateMany({ "promotion.promotionTo": { $lt: currentDate } },
        { $set: { "promotion.status": false, "promotion.promotionTo": "", "promotion.promotionFrom": "" } })

    //expiring promotion for room
    data = await tcModel.updateMany({ "promotion.promotionTo": { $lt: currentDate.toISOString() } },
        { $set: { "promotion.status": false, "promotion.promotionTo": "", "promotion.promotionFrom": "" } })


    //expiring promotion for needaroom
    data = await willbeatcModel.updateMany({ "promotion.promotionTo": { $lt: currentDate.toISOString() } },
        { $set: { "promotion.status": false, "promotion.promotionTo": "", "promotion.promotionFrom": "" } })

    console.log(currentDate)
    console.log("expiration file ran")
    process.exit(0);
    // dbMgr.connection.close()

    

}
// run()

export default run(); 