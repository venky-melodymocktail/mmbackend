// import mongoose from "mongoose";
import 'dotenv/config'
import utils from "./utils.js";
import config from './config/index.js'
import dbManager from "./db/dbManager.js";
import startApiListener from "./api/index.js";
//load config
global.configs = config;
console.log(configs.get('db.host'))

var run = async () => {
    //connect to db
    var dbMgr = new dbManager()
    await dbMgr.loadSchemas()
    //load models
    var models = dbMgr.models;
    // var a = await models.answers.model.find({})
    // console.log(a.length)

    global.MODELS = dbMgr.models;

    startApiListener()
}

run()
