// import PaymentUtil from './paymentUtil';
import jwt, { decode } from 'jsonwebtoken';
// var jwt = require('jsonwebtoken');
// const PaymentUtil = require('./paymentUtil');


class Auth {
    // app = null;
    domainName = null;
    secret = null || "melodymocktail"
    signupAction = null;
    disabledPaths = []

    setConfig(config) {
        for (let key in config) {
            this[key] = config[key];
        }
        console.log(config, this)
    }

    authMiddleware = (req, res, next) => {
        var token_header, token_parts, decoded;

        var path = req.path;
        console.log('path', path)
        if (this.disabledPaths.indexOf(path) > -1) {

            try {
                token_header = req.headers.Authorization || req.headers.authorization || req.cookies.token;
                if (token_header) {
                    decoded = jwt.verify(token_header, "melodymocktail");
                    decoded["_id"] = decoded.userId
                    req.query._id = decoded._id;
                    if (req.body) {
                        req.body._id = decoded._id;
                    } else {
                        req.body = { _id: decoded._id }
                    }
                    req.authInfo = decoded;
                }

            } catch (e) {

            }


            next();
            return;
        }

        try {
            token_header = req.headers.Authorization || req.headers.authorization || req.cookies.token;
            console.log(token_header)
            // token_parts = token_header.split(' ');
            decoded = jwt.verify(token_header, "melodymocktail");
            decoded["_id"] = decoded.userId
        } catch (e) {
            console.log(e, 'error')
            return res.sendStatus(401);
        }
        console.log(decoded, 'decodewd')
        req.query._id = decoded._id;
        if (req.body) {
            req.body._id = decoded._id;
        } else {
            req.body = { _id: decoded._id }
        }
        req.authInfo = decoded;
        next();
        return;
    }

    adminToken = (req, res) => {
        let body = req.body;
        console.log(body, req)
        let expiry = 24 * 60 * 60 * 1000;
        res.set("Cache-Control", "public, max-age=10800");
        res.cookie('login', true, { maxAge: expiry, httpOnly: false, path: "/", domain: this.domainName });
        res.cookie('token', body.token, { maxAge: expiry, httpOnly: true, path: "/", domain: this.domainName });
        res.cookie('refreshToken', body.refreshToken, { maxAge: expiry, httpOnly: true, path: "/", domain: this.domainName });
        res.status(200).send(body);
    }

    adminLogout = (req, res) => {
        let body = req.body;
        let cookie = req.cookies;
        console.log(cookie);
        let expiry = 24 * 60 * 60 * 1000;
        res.set("Cache-Control", "public, max-age=10800");
        res.cookie('login', false, { maxAge: expiry, httpOnly: false, path: "/", domain: this.domainName });
        res.cookie('token', null, { maxAge: expiry, httpOnly: true, path: "/", domain: this.domainName });
        res.cookie('refreshToken', null, { maxAge: expiry, httpOnly: true, path: "/", domain: this.domainName });
        res.status(200).send(body);
    }

    adminSignUp = async (req, res) => {
        let body = req.body.token;
        var otherData = req.body.userData

        var decoded;

        // console.log(body)
        // console.log(otherData)

        try {
            // decoded = {
            //     user:"true"
            // }
            decoded = jwt.verify(body.token, "melodymocktail");
            // console.log(decoded)

        } catch (e) {
            return res.sendStatus(401);
        }
        var user;
        try {
            // const dbModels = Model.getModelInstance(USERS);
            // user = await dbModels.create(decoded);

           var user =  await this.signupAction(decoded, otherData);
        } catch (e) {
            return res.status(400).send(e.message);
        }

        let expiry = 24 * 60 * 60 * 1000;
        res.set("Cache-Control", "public, max-age=10800");
        res.cookie('login', true, { maxAge: expiry, httpOnly: false, path: "/", domain: this.domainName });
        res.cookie('token', body.token, { maxAge: expiry, httpOnly: true, path: "/", domain: this.domainName });
        // res.cookie('refreshToken', body.refreshToken, { maxAge: expiry, httpOnly: true, path: "/", domain: this.domainName });
        res.status(200).send(user);
    }

    init(app) {
        app.get('/live', function (req, res) {
            res.send('im Live!')
        })

        app.post('/admin/token', this.adminToken);

        app.post('/admin/logout', this.adminLogout);

        app.post('/admin/signup', this.adminSignUp)

    }

}

const AuthUtil = new Auth();
export default AuthUtil;