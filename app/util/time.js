import language from '../config/language.js'
export default {
    getTimeString: function(timestamp){
        const time = new Date(timestamp);
        const hours = time.getHours()<= 12 ? time.getHours() : time.getHours() - 12,
            minu = time.getMinutes()>9 ? time.getMinutes() : '0'+time.getMinutes(),
            ap = time.getHours()<12 ? language.AM : language.PM;
        return hours+':'+minu+'  '+ap;
    },
    getYDHString: function(timestr){
        const time = new Date(timestr);
        const year = time.getFullYear(),
            mouth = time.getMonth() + 1,
            day = time.getDate();
        return mouth + '/' + day + '/'+ year + '  ' + this.getTimeString(time.getTime());
    }
}