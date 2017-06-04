const browser = { 
    versions:function(){ 
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
            ret = browser.system() || ret;
        }
        return ret;
    }(),
    system: function(){
        const mac = /mac/i,
            linux = /linux/i
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
    },
    language:(navigator.browserLanguage || navigator.language).toLowerCase() 
}
export default browser;