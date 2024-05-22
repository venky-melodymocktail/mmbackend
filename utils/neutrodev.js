// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// var jws = require('jws');
import fetch from 'node-fetch';

import jws from 'jws';

// import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';
// const stripe = new Stripe('sk_test_...');

const stripe = new Stripe('sk_test_51JdqpNSIGPXjmNrKLmnzuiNYKF4mDm20yhoqEjctF0Ys64SJCxycBLChotp9RmSvd4dEz3wPkFVfEqpjajnRN69o00EWkhfz7j');

var algo = 'HS256';
const neutrodevApiKey = 'OdocRewT1nf/GhB3RCq1Xg=='
const neutrodevSecret = process.env.NDEV_SECRET;
const zoomToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkRpUFZhVlNtUzh1SHR4MEJPUzI5bkEiLCJleHAiOjE3MDM5NjEwMDAsImlhdCI6MTY2ODE4NzM5Mn0.h-Fcd_VbetsBHWzusvKWFbS8dPMJhmuPeEj_LB_bVE8'
const zoomUserId = 'MelodyMocktail@gmail.com'
const zoomUserEmail = 'MelodyMocktail@gmail.com'

const sendEmail = async (from, to, subject, template, data) => {

    // console.log(data)

    // return;
    var newtemplate = ""
    var contact_template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
    
      <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      </head>
      <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Melody Mocktail Notification<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
      </div>
    
      <body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em">
          <tbody>
            <tr style="width:100%">
              <td>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:10px 20px">
                  <tbody>
                    <tr>
                      <td style="flex-direction: row; display: flex; align-items: center;"><img src="https://melodymocktail.blob.core.windows.net/website/mmAwsImagesBucket/mmImages/mm/logo.png" style="display:block;outline:none;border:none;text-decoration:none;height:45px; " /><a style="color:rgb(186, 15, 23); font-size: medium; font-weight: 800;margin-left: 5px;">MELODY <br/>MOCKTAIL</a></td>
                    </tr>
                  </tbody>
                </table>
                
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden">
                    
                    <tbody>
                    <tr>
                      <td>
                        
                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:20px;padding-bottom:0;padding-top:0;">
                          <tbody style="width:100%">
                            <tr style="width:100%">
                              <td data-id="__react-email-column">
                                <h1 style="font-size:32px;font-weight:bold;text-align:center">Contact Request</h1>
                                <h2 style="font-size:16px;font-weight:bold;text-align:center"> You have a contact request for your <a href="${data.serviceUrl}" target="_blank">${data.service}</a>  </h2>
                                <h2 style="font-size:16px;font-weight:bold;text-align:center"> Contact Details:  </h2>
                                <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Name: </b>${data.contactName}</p>
                                <p style="font-size:16px;line-height:24px;margin:16px 0"><b>Email: </b>${data.contactEmail}</p>
                                <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Phone: </b>${data.contactPhone}</p>
                                <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Message: </b>${data.message}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:0px 0px">
                    <tbody>
                      <tr>
                        <td style="flex-direction: row; display: flex; align-items: center;"><img src="https://melodymocktail.blob.core.windows.net/website/mmAwsImagesBucket/94511b4d-fc0a-44c7-a81b-f8c7ed2003c1.png" style="display:block;outline:none;border:none;text-decoration:none;width:100%; " /></td>
                      </tr>
                    </tbody>
                </table>
                <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">© 2023 | Melodymocktail | www.melodymocktail.com</p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    
    </html>`

    if(template=="ContactRequest"){
      newtemplate = contact_template
    }
    else{
      newtemplate = `<p>Hi ${data.name},</p> <p>Your meeting has been successfully scheduled.</p> <p><strong>Meeting Details:</strong></p> <ul> <li><strong>Expert</strong>: ${data.expertName}</li> <li><strong>Time</strong>: ${data.time}</li> <li><strong>Date</strong>: ${data.date}</li> <li><strong>Meeting Link</strong>: <a href='${data.meetJoinLink}' target='_blank'>Click Here</a>&nbsp;</li> </ul> <p></p> <p>Looking forward to getting in touch! 😀</p> <p>Best Regards,</p> <p>Melody Mocktail Team</p>`
    }
    

    

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": to,
        "subject": subject,
        "template": newtemplate
    });


    console.log('raw ', raw)

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };


    var res = await fetch("https://auth.melodymocktail.com/auth/sendMail", requestOptions)

    var status = res.status;
    console.log(res, status);

    res = await res.json();
    return res
}

const sendNotification = async (uid, title, body) => {
    var raw = { uid, data: { title, body } }

    console.log('raw ', raw)


    var res = await fetch(
        `https://services.neutrodev.com/pn/send`,
        {
            method: "post",
            headers: { "Content-Type": "application/json", "apikey": neutrodevApiKey },
            // credentials: 'include',
            body: JSON.stringify(raw)
        }
    );

    var status = res.status;
    res = await res.json();
    console.log(res, status);
    return res


}


const createOrder = async (userId, total, mode = 'rzp') => {

    let result = null;

    if (mode == 'rzp') {
        result = await createRzpOrder(userId, total)
    } else if (mode == 'stripe') {
        result = await createStripeOrder(userId, total)

    }

    return result


}

const createRzpOrder = async (userId, total) => {

    var raw = { token: jwtSign({ userId, total, }, {}, neutrodevSecret) }

    console.log('raw ', raw)


    var res = await fetch(
        `https://services.neutrodev.com/payments/normalOrders`,
        {
            method: "post",
            headers: { "Content-Type": "application/json", "apikey": neutrodevApiKey },
            // credentials: 'include',
            body: JSON.stringify(raw)
        }
    );

    var status = res.status;
    res = await res.json();
    console.log(res, status);
    return res

}

const createStripeOrder = async (userId, total) => {
    console.log('stripe called')
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
        automatic_payment_methods: {
            enabled: true,
        },
        // payment_method: 'pm_card_visa',
    });

    return {
        clientSecret: paymentIntent.client_secret,
    }

}


const verifyPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    var raw = { token: jwtSign({ razorpay_order_id, razorpay_payment_id, razorpay_signature }, {}, neutrodevSecret) }

    console.log('raw ', raw)


    var res = await fetch(
        `https://services.neutrodev.com/payments/normalOrders/verify`,
        {
            method: "post",
            headers: { "Content-Type": "application/json", "apikey": neutrodevApiKey },
            // credentials: 'include',
            body: JSON.stringify(raw)
        }
    );

    var status = res.status;
    if (status == 200) {
        res = await res.json();
    } else {
        res = {
            "signatureIsValid": "false"
        }
    }
    console.log(res, status);
    return res


}


const createUser = async (body) => {
    var raw = { ...body, secret: neutrodevSecret, validation: 'secret' }

    console.log('raw ', raw)


    var res = await fetch(
        `https://services.neutrodev.com/users`,
        {
            method: "post",
            headers: { "Content-Type": "application/json", "apikey": neutrodevApiKey },
            // credentials: 'include',
            body: JSON.stringify(raw)
        }
    );

    var status = res.status;
    if (status == 200) {
        res = await res.json();
    } else {
        res = false;
    }
    console.log(res, status);
    return res


}

function generatePassword(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const createMeeting = async (name, topic, duration, startTime, fromEmail, toEmail) => {
    zoomToken = await getZoomAcessToken()
    // console.log(zoomToken, 'zoomToken')
    var password = generatePassword(8)
    var myHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + zoomToken
    }


    var raw = JSON.stringify({
        "agenda": name,
        "default_password": false,
        "duration": duration,
        "password": password,
        "pre_schedule": false,

        "schedule_for": zoomUserEmail,
        "settings": {
            "additional_data_center_regions": [
                "TY"
            ],
            "allow_multiple_devices": true,
            "alternative_hosts": "",
            "alternative_hosts_email_notification": true,
            "approval_type": 2,
            "approved_or_denied_countries_or_regions": {
                "approved_list": [
                    "CX"
                ],
                "denied_list": [
                    "CA"
                ],
                "enable": true,
                "method": "approve"
            },
            "audio": "telephony",
            "authentication_exception": [

            ],
            "auto_recording": "cloud",

            "calendar_type": 1,
            "close_registration": false,
            "contact_email": fromEmail,
            "contact_name": "Jill Chill",
            "email_notification": true,
            "encryption_type": "enhanced_encryption",
            "focus_mode": true,
            "global_dial_in_countries": [],
            "host_video": true,
            "jbh_time": 0,
            "join_before_host": false,

            "meeting_authentication": true,
            "meeting_invitees": [
                {
                    "email": toEmail
                }
            ],
            "mute_upon_entry": false,
            "participant_video": false,
            "private_meeting": false,
            "registrants_confirmation_email": true,
            "registrants_email_notification": true,
            "registration_type": 1,
            "show_share_button": true,
            "use_pmi": false,
            "waiting_room": false,
            "watermark": false,
            "host_save_video_order": true,
            "alternative_host_update_polls": true
        },
        "start_time": startTime,
        "timezone": "America/Los_Angeles",
        "topic": topic,

        "type": 2
    });

    console.log(JSON.stringify(raw))

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    try {
        var res = await fetch(`https://api.zoom.us/v2/users/${zoomUserId}/meetings`, requestOptions)
        res = await res.json()

        console.log(res)
        return res

    } catch (e) {
        console.log("Error getting design")
        console.log(e)
        return { type: 'error', message: e }
    }

}


const jwtSign = (payload, options, secretOrPrivateKey) => {
    options = options || {};
    var expiresInMs = options.expiresInMs ? options.expiresInMs : 300000;
    var header = {
        alg: algo
    };
    payload.iat = Math.round(Date.now() / 1000);
    payload.exp = payload.iat + expiresInMs;
    var signed = jws.sign({
        header: header,
        payload: payload,
        secret: secretOrPrivateKey
    });
    return signed;
}

const getZoomAcessToken = async () => {



    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic Z2FWYVEyYm9UNUNsZ2xvOXZWelJaQTpOWEx3TjdFVm8wSzJTeDVYSk5GU1JjeGozTjR5YVAwRQ==");
    // myHeaders.append("Cookie", "TS018dd1ba=01c8657a5073ee2e3096925ee2d3478b7cb28d5977fa4461e87e9fdcdda5ce45321977c7129cde1b39d5fe8e4022aa932c04f3ea27; TS01f92dc5=01c8657a5073ee2e3096925ee2d3478b7cb28d5977fa4461e87e9fdcdda5ce45321977c7129cde1b39d5fe8e4022aa932c04f3ea27; __cf_bm=BXZC2ZiviDWGsSBx.hanBBjVihaIi_eECtWZbG5su8g-1691994107-0-AeKruCEzznkVbT3IDlBt+0jmLpr56guPcyffv66WC84aTh6G/cSh/q/FRmr2zAw1AFEWSemrBQNqDfm42GU1OFo=; _zm_chtaid=19; _zm_ctaid=G9fJwzqfQhOIHRXPVKUZGg.1691992854684.e35b02a68f3976ca3fc7d10ff681fe2f; _zm_mtk_guid=48c2f8fbe074424e9d55aa77e93975a9; _zm_page_auth=us04_c_nZUY63vQTUyhKL94IqVV7w; _zm_ssid=us04_c_EpkqQJAISumOyj37OsQKoA; cred=AC4C007DC1AF965D21ED8136E6F78FDC");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    let res = await fetch("https://zoom.us/oauth/token?grant_type=account_credentials&account_id=a5u4SNQNSGaMBSxZMy-IJA", requestOptions)

    res = await res.json()

    let accessToken = res.access_token
    // console.log(res)

    return accessToken
}



export {
    sendEmail, sendNotification, verifyPayment, createOrder, createUser, createMeeting
}