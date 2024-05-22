import * as fs from 'fs'
import _ from 'lodash';
import mustache from 'mustache';
const __dirname = new URL('.', import.meta.url).pathname;
const serviceContent = `

class service {


}

var {{name}}Service = new service()
export default {{name}}Service

`

const functionContent = `
var defaultCollection = "{{collection}}"
var defaultModel = MODELS[defaultCollection].model


const {{name}}Func = async (req, res) => {
    var data = await defaultModel.create(req.body)
    res.send(data)
}

export default {{name}}Func


`

const generateServiceFiles = async () => {
    var path = __dirname + 'api/rest'
    // var rest = path + 'rest';

    console.log(path)
    var files = fs.readdirSync(path);
    // console.log(files, 'files')

    var folders = []
    var routes = []
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        var filePath = [path, file].join('/');
        var pathStat = fs.statSync(path);

        // if (pathStat.isFile() && file.substr(-3) === '.js') {
        let data = (await import(filePath)).default
        var name = file.split('.')[0]
        folders.push(name)
        routes.push(data)
        // console.log(routes)
        // }


        // var name = file.split('.')[0] + 'Service.js'
        // serviceFiles.push(name)


    }



    // console.log(folders, 'folders')
    // console.log(routes, 'routes')



    var servicePath = __dirname + 'api/services'
    try {
        fs.mkdirSync(servicePath)

    } catch (error) {

    }

    var currentServiceFiles = fs.readdirSync(servicePath)

    // console.log(currentServiceFiles)
    for (let i = 0; i < folders.length; i++) {
        const name = folders[i];
        // console.log(routes[i].length)
        var serviceFolderPath = servicePath + '/' + name

        try {
            fs.mkdirSync(serviceFolderPath)

        } catch (e) { }

        var data = routes[i]

        for (let j = 0; j < data.length; j++) {
            const uRoute = data[j];
            var fileName = _.camelCase(uRoute.type + uRoute.path.replaceAll('/', '-'))
            var spath = serviceFolderPath + '/' + fileName + '.js'
            var content = mustache.render(functionContent, { name: fileName, collection: uRoute.collection })
            if (uRoute.customFunction == true) {
                if (!fs.existsSync(spath)) {
                    fs.writeFileSync(spath, content)
                }
            }
        }

    }

    // for (let i = 0; i < serviceFiles.length; i++) {
    //     const sfile = serviceFiles[i];
    //     if (currentServiceFiles.includes(sfile)) {
    //         continue
    //     } else {
    //         var name = sfile.replace('Service.js', '')
    //         var content = mustache.render(serviceContent, { name: name })
    //         var spath = servicePath + '/' + sfile
    //         fs.writeFileSync(spath, content)
    //         console.log(`:::::::::::::::  ${sfile} Created  :::::::::::::::`)
    //     }

    // }

    // console.log(currentServiceFiles)


}

generateServiceFiles()