import { ObjectId } from "mongodb";

const cond = {
    search: (key, val) => {
        var obj = {};
        obj[key] = { "$regex": val }
        return obj
    },
    gte: (key, val) => {
        var obj = {};
        obj[key] = { "$gte": val }
        return obj
    },
    lte: (key, val) => {
        var obj = {};
        obj[key] = { "$lte": val }
        return obj
    },
    gt: (key, val) => {
        var obj = {};
        obj[key] = { "$gt": val }
        return obj
    },
    lt: (key, val) => {
        var obj = {};
        obj[key] = { "$lt": val }
        return obj
    },
    all: (key, val) => {
        var obj = {};
        val = JSON.parse(val)

        obj[key] = { "$all": val }
        return obj
    }
}

const getCondition = (fields, query) => {
    var arr = []
    for (let i = 0; i < fields.length; i++) {
        const e = fields[i];
        var val = query[e.name];
        if (!val) {
            continue
        }
        if (e.type) {
            switch (e.type) {
                case "number":
                    val = Number(val)
                    break
                case "objectId":
                    val = new ObjectId(val)
                    break
                case "null":
                    if (val == "null") {
                        val = null
                    }
                    break

            }
        }
        var key = e.key

        var obj = e.filterType ? cond[e.filterType](key, val) : { [key]: val }
        var index = arr.findIndex(e => { return key in e })
        if (index == -1) {
            arr.push(obj)
        } else {
            arr[index][key] = { ...arr[index][key], ...obj[key] }
        }
    }

    if (arr.length > 0) {
        return { $match: { $and: arr } };

    } else {
        return {}
    }

}

export default getCondition 