function getSystem(){
    const mac = /mac/i,
        linux = /linux/i,
        win = /win/i;
    const platform = navigator.platform.toLowerCase();
    if(mac.test(platform)){
        return 'MAC';
    } else if(win.test(platform)){
        return 'WIN';
    } else if(linux.test(platform)){
        return 'Linux';
    }
    return undefined;
}
const browser = { 
    versions:function(browser){ 
        let ret = 'xxSys';
        const u = navigator.userAgent;
        const lu = u.toLowerCase();
        const isMobile = !!u.match(/AppleWebKit.*Mobile.*/),
            ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        if(isMobile){
            if(ios) return 'IOS';
            if(android) return 'Android';
        } else {
            ret = getSystem() || ret;
        }
        return ret;
    }(browser),
    
    language:(navigator.browserLanguage || navigator.language).toLowerCase() 
}
export default browser;