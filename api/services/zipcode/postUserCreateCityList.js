var defaultCollection = "citylist"
var defaultModel = MODELS[defaultCollection].model


const postAdminZipcodeCreate = async (req, res) => {

    try {
        var term = req.body.citystatecodeurl
        // console.log(req.body)
        // res.send(term)
        // return
        
        const myHeaders = new Headers();
        myHeaders.append("authority", "ca.sulekha.com");
        myHeaders.append("accept", "*/*");
        myHeaders.append("accept-language", "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7");
        myHeaders.append("cookie", "seotrack=landingurl=/&sourceurl=&sourcekeyword=&type=Direct&semcampaign=&semcampaignid=; sulustempcookie=united states::US::New York::::New York::10292::40.7143::-74.0067::0; sulusrtrack=977086f5-5b5d-4d72-9001-7247e0322514; _cc_id=2df9f9bc8f0ddaeb1669641f16da5e11; panoramaId_expiry=1710845317199; panoramaId=3f66c1fd12059eded2a7c50c7afda9fb927aeb9b8220dc78ad1d091f31dae36c; panoramaIdType=panoDevice; tvc_vid=91710758917416; tvc_session_count=0; _clck=babqwy%7C2%7Cfk6%7C0%7C1538; _gid=GA1.2.225850795.1710758919; mycity=Vijayawada; mycountry=in; firstUserUS=0; _uetsid=22732280e51511eeb696af87727a1084; _uetvid=eaf79e50c5d911ee8f50296805447152; _ga_2YBS92QCZR=GS1.1.1710758943.1.1.1710759496.60.0.0; _ga_5KNX013SZ6=GS1.1.1710758943.1.1.1710759496.0.0.0; sulrefinfo=medium=Internal-Sulekha:sul-sep:src=us.sulekha.com:sul-sep:refurl=https://us.sulekha.com/; cto_bundle=3a9pAl9lblglMkJOdXFPeThkaEI4NGJBRnZOZFhaMXppbVNKQmNlWmhHTmlpWERpTnoyQW1DdTBuVVpVSTdIcHlXQTVqV05uMzFReUhDJTJCYUlQcGRmRlNBckVHSVFxY1FBWXRoZHNNWjVhcjNVckdDenRzdGJ4TWVsTE1GQlNVaVI0bnBaV3gydG50S0JtYzh0emQ0JTJCMFdHWnFJRGFZQW5VUHd0V0N1VGlBQ2ZIUVAlMkIzc2hEdCUyRjBINldCTnEwbCUyQlVhOGhBJTJCMmxOWEp5TzRDOUNwSDlYaDVlZk56T21jWmJkM0lHT2VocVFCVHcyZXVrNlpleVUlMkI1eHVaM0xWRks3ZkkxJTJGanZ4Z0oyQnR3TTI3RDI5Wk1VeDJrQ2c1ajZVQklOT2NSOCUyRkhtMEdaN0hFSHZRWTVWeWxkRGg4NGVCcUdLSW1PUVB3; _ga=GA1.3.474251837.1710758918; _gid=GA1.3.225850795.1710758919; sulcatempcookie=Canada::CA::Ontario::::Toronto::M6N 1A2::43.6683965::-79.452945::0; _clsk=1esiref%7C1710759794291%7C5%7C1%7Cl.clarity.ms%2Fcollect; sulusrloc=canada%3A%3Aca%3A%3AOntario%20%3A%3AON%3A%3ATurkey%20Point%3A%3AN0E%201T0%3A%3A42.691382%3A%3A-80.327537%3A%3A1; parenturl=https://us.sulekha.com/; _ga_VJL23NS0HP=GS1.1.1710758917.1.1.1710760557.50.0.0; _ga_WYYNWPYYXB=GS1.1.1710759573.1.1.1710760559.0.0.0; _ga=GA1.2.474251837.1710758918");
        myHeaders.append("referer", "https://ca.sulekha.com/toronto-metro-area");
        myHeaders.append("sec-ch-ua", "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"");
        myHeaders.append("sec-ch-ua-mobile", "?1");
        myHeaders.append("sec-ch-ua-platform", "\"Android\"");
        myHeaders.append("sec-fetch-dest", "script");
        myHeaders.append("sec-fetch-mode", "no-cors");
        myHeaders.append("sec-fetch-site", "same-origin");
        myHeaders.append("user-agent", "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        var list = await fetch(`https://ca.sulekha.com/common/objprocess.aspx?type=citilist&term=${term}`, requestOptions)
        var cityList  = await list.text()
        // console.log(cityList)
        
        var formatedString = cityList.substring(1, cityList.length - 2);
        var jsonData = await JSON.parse(formatedString);
        // console.log(formatedString)

        for(var i = 0; i <jsonData.length; i++){
            var cityData = jsonData[i];
            var data = await defaultModel.create(cityData)
            console.log(data)
        }

        res.send(jsonData);
        // res.send(data)
    } catch (error) {
        res.send(error)
    }

}

export default postAdminZipcodeCreate