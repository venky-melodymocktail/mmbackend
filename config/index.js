import * as fs from 'fs'
import { createRequire } from "module";
import convict from 'convict'
const require = createRequire(import.meta.url);
var dir = fs.readdirSync('./config/configs')

const getConfig = () => {
    var config = {}

    dir.forEach((file) => {
        var fileName = file.split('.')[0]
        var c = require('./configs/' + file)
        config[fileName] = c
    })
    // console.log(config)
    return convict(config)

}

const config = getConfig()

export default config