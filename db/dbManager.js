import mongoose from "mongoose"
import * as fs from 'fs'

import utils from "../utils.js"
import { createRequire } from "module";
import baseModel from "./models/baseModel.js";
const require = createRequire(import.meta.url);

class dbManager {

    constructor(config) {
        // this.url = config?.url || utils.getMongoConnectionString()
        this.url = process.env.DB_URL
        this.connect()
    }

    connection = null
    schemas = {}
    models = {}
    dbUrl = process.env.DB_URL
    connect = () => {
        this.connection = mongoose.connect(this.url)
        // this.connection = mongoose.connect(this.dbUrl)
    }


    loadSchemas = async () => {
        var dir = fs.readdirSync('./db/schemas')
        for (let i = 0; i < dir.length; i++) {
            const file = dir[i];
            var fileName = file.split('.')[0]
            // console.log(file)
            let c = (await import('./schemas/' + file)).default
            // console.log(c.data)
            let mSchema = new mongoose.Schema(c.data)
            mSchema.pre('updateMany', function (next) {
                // Update the 'mOn' field to the current date
                this.update({}, { $set: { mOn: new Date() } });
                // console.log(this, 'presave')
                next();
            });
            mSchema.pre('updateOne', function (next) {
                // Update the 'mOn' field to the current date
                this.update({}, { $set: { mOn: new Date() } });
                // console.log(this, 'presave')
                next();
            });
            mSchema.pre('update', function (next) {
                // Update the 'mOn' field to the current date
                this.update({}, { $set: { mOn: new Date() } });
                // console.log(this, 'presave')
                next();
            });
            this.schemas[c.name] = mSchema //c.data
            // console.log(c.name)
            let model = mongoose.model(c.name, mSchema)
            this.models[c.name] = new baseModel(model, c.name);
            console.log(this.models)
        }
        // console.log(this.schemas)
        // console.log(this.models['answers'].model)
    }
}

export default dbManager