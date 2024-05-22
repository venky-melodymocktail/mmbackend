import express from 'express';
import { createRequire } from "module";

import bodyParser from 'body-parser'
import cors from 'cors'
import * as fs from 'fs'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import apiInitializer from './apiInitializer.js';
import AuthUtil from './t18backend/AuthUtil.js'
import PaymentUtil from './t18backend/paymentUtil.js';
// import PostmanUtil from '../postmanUtil.js';
// import appSettings from '../config/settings.json'
// import validatePayment from './services/users/validatePayment.js';
const __dirname = new URL('.', import.meta.url).pathname;
const require = createRequire(import.meta.url);





// const AuthUtil = require("./t18backend/AuthUtil.js");
// const AuthUtil = require("t18backend/utils/AuthUtil");
// const TopicService = require("./services/TopicService");
// const PaymentUtil = require("t18backend/utils/paymentUtil");
// const PaymentUtil = require("./t18backend/paymentUtil.js");

AuthUtil.setConfig({
    // domainName: ".localhost",

    domainName: ".upscready.com",

    secret: process.env.NDEV_SECRET,
    disabledPaths: ['/admin/token', '/admin/signup', '/admin/logout', '/live',
        '/admin/public/contents', '/admin/public/questions', '/user/blogs', '/user/movieSuggestion', '/user/isUser', '/user/blogcomments', '/user/blogDetail', '/user/movieDetail', '/user/visafaqs', '/user/visaqandas',
        '/user/rideSharing', '/user/haveARide', '/user/rideDetail', '/user/visaquestioncomments', '/user/needAHomeDetail', '/user/homeDetail', '/user/homes', '/user/needAHomes', '/user/rooms', '/user/needaroom', '/user/willBeATravelCompanionDetail', '/user/travelCompanionDetail',
        '/user/roomsDetail', '/user/needaroomDetail', '/user/order/create', '/user/order/update', '/user/orders', '/user/searchHomes', '/user/searchRooms', '/user/adspaces', '/user/visaqandasDetail', '/user/travelCompanion', '/user/willBeATravelCompanion', '/user/zipcode/search', '/user/airports',
        '/user/blogCategory', '/user/rentals', '/user/rentalDetail', '/user/needarental', '/user/needarentalDetail', '/user/searchRentals', '/user/searchNeedARentals', '/user/createCityList']
})
PaymentUtil.setData('neutrodevApiKey', "OdocRewT1nf/GhB3RCq1Xg==")
var appContext = process.env.APP || "api";
// console.log("🚀 ~ file: index.js ~ line 10 ~ appContext", appContext)


var app = express();
app.use(helmet());
app.disable("etag").disable('x-powered-by');

// app.use(cors('*'));
app.use(cors({
    credentials: true, origin: ['http://localhost:3000', 'http://localhost:3001', 'https://neutrodev.com',
        'https://builder.neutrodev.com', 'https://builderv1.neutrodev.com', 'https://melodymocktail.com',
        'https://ndev.melodymocktail.com', 'https://admin.melodymocktail.com', 'https://www.melodymocktail.com',
        'https://melodymocktail.com', 'https://coming-soom-641e8c092aa50b3f6673a378.app.neutrodev.com',
        'https://mm-dev-64390b599811daae82a555cf.app.neutrodev.com', 'https://admin-6421601b2aa50b3f6673a74e.app.neutrodev.com',
        'https://testing.melodymocktail.com ']
}));
app.use(cookieParser());
app.use(morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400; }
}));

app.get('/api/sync_time', function (req, res) {
    res.send({ date: new Date().toISOString() });

});
if (appContext === 'api') {
    // app.use(authMiddleware());
}
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// AuthClass.app = app;
AuthUtil.init(app)
app.use(AuthUtil.authMiddleware, (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    var url = req.originalUrl.split('?')[0]
    var disabledUrls = [];

    if (disabledUrls.indexOf(url) > -1) {
        var reqType = req.method.toLowerCase();
        if (reqType === 'get') {
            if (req.query._id) {
                req.query.userId = req.query._id
                delete req.query._id
            }
            // console.log('req.query', req.query)
        } else {
            if (req.body._id) {
                req.body.userId = req.body._id

                delete req.body._id
            }
        }

        next()
        return
    }

    if (req.originalUrl.includes("/admin/")) {
        if (!req.originalUrl.includes("signup")) {

            if (req.query._id != "65d4a40b2926095f2763a7d9") {
                res.status(401).send({ message: "Unauthorized" })
                return
            }
        }
    }

    var reqType = req.method.toLowerCase();
    if (reqType === 'get') {
        req.query.userId = req.query._id
        delete req.query._id
        // console.log('req.query', req.query)
    } else {
        req.body.userId = req.body._id
        // req.body.authInfo = req.authInfo
        delete req.body._id
    }

    next()
})

const initRoutes = async (path, app) => {
    var rest = path + 'rest';
    var files = fs.readdirSync(rest);
    var allRoutes = {}

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        var filePath = [rest, file].join('/');
        var pathStat = fs.statSync(filePath);
        if (pathStat.isFile() && file.substr(-3) === '.js') {
            let routes = (await import(filePath)).default
            var name = file.split('.')[0]
            for (let j = 0; j < routes.length; j++) {
                routes[j].folder = name

            }
            allRoutes[name] = routes
            for (let j = 0; j < routes.length; j++) {
                const route = routes[j];

                new apiInitializer(route, app)

            }
            // console.log(routes)
        }
    }

    // const validatePayment = (await import('./services/users/validatePayment.js')).default

    // PaymentUtil.setData('onPaymentSuccess', validatePayment)

    // const userSignup = (await import('./services/users/userSignup.js')).default

    // AuthUtil.setConfig({
    //     signupAction: userSignup,
    // })

    const userSignup = (await import('./services/users/postClientUser.js')).default

    AuthUtil.setConfig({
        signupAction: userSignup,
    })


    // if (configs.get('app.env') === 'dev') {
    //     console.log('DEV ENV')
    //     PostmanUtil.syncPostman(allRoutes)

    //     return
    // }

    // AuthUtil.init(app)

    // app.use(AuthUtil.authMiddleware)


}
// console.log(__dirname)
// AuthUtil.init(app)
// PaymentUtil.init(app)

// new apiInitializer(routes[0], app)

const startApiListener = async () => {
    await initRoutes(__dirname, app)
    return app.listen(process.env.PORT || 3000, function (err) {
        if (err) {
            console.log('Error in starting api server:', err);
        }

        console.log("api server listening on", process.env.PORT || 3000);
    });
};


export default startApiListener
