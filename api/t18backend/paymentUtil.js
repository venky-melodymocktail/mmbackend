import moment from 'moment';

// const moment = require("moment");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

class Payment {



    setData(key, value) {
        this[key] = value;
    }
    onPaymentSuccess = null;
    onPaymentError = null;

    neutrodevApiKey = ''
    validatePayment = async (req, res) => {
        var orderId = req.body.orderId;
        console.log('validatePayment', orderId)
        var result = await this.neutrodevPaymentValidation(orderId)
        console.log('validatePayment', result)
        if (result) {
            console.log('onPaymentSuccess', this.onPaymentSuccess)
            if (this.onPaymentSuccess) {
                await this.onPaymentSuccess(result)
            }
            res.status(200).send({ message: 'success' });

        } else {
            if (this.onPaymentError) {
                await this.onPaymentError()

            }
            res.status(401).send({ message: 'failed' });

        }
    }

    neutrodevPaymentValidation = async (orderId) => {
        console.log('neutrodevPaymentValidation', orderId)
        var res = await fetch(
            `https://services.neutrodev.com/transaction?orderId=${orderId}`,
            {
                method: "get",
                headers: { "Content-Type": "application/json", "apikey": this.neutrodevApiKey },
                // credentials: 'include',
            }
        );
        var status = res.status;
        res = await res.json();
        console.log(res, status)
        if (status == 200) {
            const timeElapsed = moment().diff(moment(res.cOn), 'seconds');
            console.log(timeElapsed, 'timeElapsed')
            console.log(res, 'res')
            if (timeElapsed > 60) {

                return false
            }
            if (!res[0].verified) {


                return false
            }
            return res[0]
        } else {
            return false
        }

    }


    init(app) {
        app.post('/admin/payment/validate', PaymentUtil.validatePayment)


    }



}

const PaymentUtil = new Payment();
export default PaymentUtil;