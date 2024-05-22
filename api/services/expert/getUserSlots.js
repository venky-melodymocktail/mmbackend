import _ from "lodash";

var defaultCollection = "expert"
var defaultModel = MODELS[defaultCollection].model
const MAX_GROUP_SIZE = 3



const getUserSlots = async (req, res) => {

    try {

        //get all experts available on the date
        //Remove the booked slots
        //Make union of available slots of all the experts and return


        var date = req.query.date
        let category = req.query.category;
        let type = req.query.type.toLowerCase();





        let data = []
        if (type == "single") {
            data = await getAllSlotsForSingleBooking(date, category)

        } else if (type == "group") {
            data = await getAllSlotsForGroupBooking(date, category)

        } else {
            res.status(400).send({ message: "Bad Request", type:type })
        }

        var totalSlots = []

        for (let i = 0; i < data.length; i++) {



            if (!totalSlots.includes(data[i].daySlot)) {
                totalSlots.push(data[i].daySlot)
            }


        }

        // availableSlots = totalSlots
        res.send({ slots: totalSlots, date: date })
        // res.send(data)

    } catch (error) {
        res.send(error)
    }




}

const getAllSlotsForSingleBooking = async (date, category) => {

    const currentDate = new Date(date);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = daysOfWeek[currentDate.getDay()].toLowerCase();
    currentDate.setHours(0, 0, 0, 0);



    // var data = await defaultModel.find({ category: req.query.category })

    var dayQuery = {}
    dayQuery['slots.' + day] = { '$exists': true }

    let pipeline = [
        {
            '$match': {
                ...dayQuery
                ,
                'category': category
            }
        },
        {
            '$addFields': {
                'daySlot': '$slots.' + day
            }
        },
        {
            '$unwind': {
                'path': '$daySlot',
                'preserveNullAndEmptyArrays': false
            }
        }, {
            '$lookup': {
                'from': 'bookings',
                'let': {
                    'expertId': {
                        '$toString': '$_id'
                    },
                    'slot': '$daySlot'
                },
                'pipeline': [
                    {
                        '$match': {
                            'date': currentDate,
                            '$and': [
                                {
                                    '$expr': {
                                        '$eq': [
                                            '$$slot', '$slot'
                                        ]
                                    }
                                }, {
                                    '$expr': {
                                        '$eq': [
                                            '$$expertId', '$expertId'
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ],
                'as': 'bookings'
            }
        }, {
            '$addFields': {
                'isBooked': {
                    '$size': '$bookings'
                }
            }
        }, {
            '$match': {
                'isBooked': 0
            }
        }
    ]
    let data = await defaultModel.aggregate(pipeline)
    return data

}

const getAllSlotsForGroupBooking = async (date, category) => {

    const currentDate = new Date(date);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = daysOfWeek[currentDate.getDay()].toLowerCase();
    currentDate.setHours(0, 0, 0, 0);



    // var data = await defaultModel.find({ category: req.query.category })

    var dayQuery = {}
    dayQuery['slots.' + day] = { '$exists': true }

    let pipeline = [
        {
            '$match': {
                ...dayQuery
                ,
                'category': category
            }
        },
        {
            '$addFields': {
                'daySlot': '$slots.' + day
            }
        },
        {
            '$unwind': {
                'path': '$daySlot',
                'preserveNullAndEmptyArrays': false
            }
        }, {
            '$lookup': {
                'from': 'bookings',
                'let': {
                    'expertId': {
                        '$toString': '$_id'
                    },
                    'slot': '$daySlot'
                },
                'pipeline': [
                    {
                        '$match': {
                            'date': currentDate,
                            '$and': [
                                {
                                    '$expr': {
                                        '$eq': [
                                            '$$slot', '$slot'
                                        ]
                                    }
                                }, {
                                    '$expr': {
                                        '$eq': [
                                            '$$expertId', '$expertId'
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ],
                'as': 'bookings'
            }
        }, {
            '$addFields': {
                isSingle: {
                    $cond: [
                        {
                            $eq: [
                                {
                                    $arrayElemAt: ["$bookings.type", 0],
                                },
                                "single",
                            ],
                        },
                        true,
                        false,
                    ],
                },
                'isBooked': {
                    '$size': '$bookings'
                }
            }
        }, {
            '$match': {
                isSingle: false,
                isBooked: {
                    $lt: MAX_GROUP_SIZE,
                },
            }
        }
    ]
    let data = await defaultModel.aggregate(pipeline)
    return data

}
export default getUserSlots