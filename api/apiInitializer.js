
import _ from "lodash";
import getCondition from "./matchBuilder.js"
const __dirname = new URL('.', import.meta.url).pathname;

class apiInitializer {

    constructor(api, app) {
        this.api = api
        this.app = app

        this.init()
    }
    DEFAULT_SKIP = 0
    DEFAULT_LIMIT = 100
    api = null
    init = async () => {

        var apiType = this.api.type;

        if (this.api.customFunction == true) {

            var apipath = this.api.path.replace("/", '-')
            var fileName = _.camelCase(this.api.type + apipath)
            // var fileName = _.camelCase(this.api.type + this.api.path.replaceAll('/', '-'))

            var functionPath = __dirname + 'services/' + this.api.folder + '/' + fileName + '.js'

            console.log(functionPath + 'function path')
            this.customFunction = (await import(functionPath)).default
        }

        switch (apiType) {
            case 'get':
                this.app['get'](this.api.path, this.getFunction)
                break;
            case 'post':
                this.app['post'](this.api.path, this.postFunction)
                break;
            case 'put':
                this.app['put'](this.api.path, this.putFunction)
                break;
        }

    }

    getFunction = async (req, res) => {
        console.log(this.api.collection)
        var pipeline;
        var collection = this.api.collection
        var model = MODELS[collection].model;
        var response = {}
        console.log(`
//////////// GET API CALL //////////////
Path:>> ${this.api.path}        
        `)

        if (!this.api.customFunction) {
            var valid = this.getQueryValidator(req.query, this.api.allowedQueryParams.default, res)
            if (!valid) {
                res.status(400).send({ "error": "Bad Request", "message": "Required parameters missing" })
                return
            }
            var matchCond = getCondition(this.api.allowedQueryParams.default, req.query)

            var additonalPipeline = this.api.appendAggregate(req.query)
            var skipLimit = [{ $skip: Number(req.query.skip) || this.DEFAULT_SKIP }, { $limit: Number(req.query.limit) || this.DEFAULT_LIMIT }]
            if (this.api.disableMatch == true) { matchCond = { $match: {} } }
            if (this.api.diableLimitSkip == true) { skipLimit = [] }
            pipeline = [matchCond, ...additonalPipeline, ...skipLimit]
            pipeline = pipeline.filter(
                obj => !(obj && Object.keys(obj).length === 0)
            );
            console.log(`
${JSON.stringify(pipeline)}
        `)

            response = await model.aggregate(pipeline)
            console.log(response, pipeline)

        } else {
            this.customFunction(req, res)

            return


        }
        res.send(response)

    }

    postFunction = async (req, res) => {
        var collection = this.api.collection
        var model = MODELS[collection].model;
        // var req = this.filterBody(req.body)
        _.set(req, 'body', this.filterBody(req.body, this.api.allowedBody.default))
        // console.log(req.body)
        console.log(`
//////////// POST API CALL //////////////
Path:>> ${this.api.path}        
        `)
        if (!this.api.customFunction) {
            var body = {}

            for (let i = 0; i < this.api.allowedBody.default.length; i++) {
                const key = this.api.allowedBody.default[i];
                if (key in req.body) {
                    body[key] = req.body[key]
                }

            }

            //insert data
            var a = await model.create(body)
            console.log(a.length)

            res.send(a)

        } else {
            this.customFunction(req, res)

        }

    }
    putFunction = async (req, res) => { }

    getQueryValidator = (query, definition, res) => {
        for (let i = 0; i < definition.length; i++) {
            const d = definition[i];
            if (d.required) {
                if (!(d.name in query)) {
                    return false
                }
            }

        }
        return true

    }

    filterBody = (body, definition) => {
        var temp = {}
        for (let i = 0; i < definition.length; i++) {
            const key = definition[i];

            temp[key] = body[key];

        }
        return temp
    }


}

export default apiInitializer