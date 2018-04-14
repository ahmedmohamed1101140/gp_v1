
module.exports=function(req) {

    var browser;

    ua = req.headers['user-agent'];
    if (/mozilla/i.test(ua)) {
        browser = 'firefox';
    }
    else if (/chrome/i.test(ua)) {
        browser = 'chrome';
    }
    else if (/safari/i.test(ua)) {
        browser = 'safari';
    }
    else if (/opr/i.test(ua)) {
        browser = 'opra';
    }
    else if (/applewebkit/i.test(ua)) {
        browser = 'AppleWebKit';
    }

    const appjson = /json/i;

    if (!browser || appjson.test(req.headers['content-type'])) {

        return true; // appi

    }
    else if (browser) {

        return false;  //app

    }
}