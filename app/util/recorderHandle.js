import Recorder from './recorder.js'

export default (function (){
    let audio_context,
        getUserMedia,
        recorder,
        stream,
        isSupport = true;
    (function init() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            // window.URL = window.URL || window.webkitURL;
            getUserMedia = initUserMediaHandle();
            audio_context = new AudioContext;
        } catch (e) {
            isSupport = false;
            console.log('No web audio support in this browser!');
        }
        
    })();
    function initUserMediaHandle(){
        if(!navigator.mediaDevices) navigator.mediaDevices = {};
        if (!navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                isSupport = !!getUserMedia;
                if (!getUserMedia) return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            }
        }
        return navigator.mediaDevices.getUserMedia;
    }
    function startRecording() {
        recorder && recorder.record();
    }
    function stopRecording() {
        recorder && recorder.stop();
        recorder.clear();
    }
    function startUserMedia() {
        if(isSupport){
            navigator.mediaDevices.getUserMedia({audio: true})
            .then((inputStream) => {
                stream = inputStream;
                let input = audio_context.createMediaStreamSource(inputStream);
                input.connect(audio_context.destination);
                recorder = new Recorder(input);
                startRecording();
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }
    function stopUserMedia(){
        stopRecording()
        if(stream){
            let tracks = stream.getTracks();
            for(let i=0; i<tracks.length; i++){
                tracks[i].stop();
            }
        }
    }
    function createDownloadLink() {
        return new Promise((resolve,reject) => {
            recorder && recorder.exportWAV(function(blob) {
                // var url = URL.createObjectURL(blob);
                resolve(blob);
            });
        })
    }
    return {startUserMedia,stopUserMedia,createDownloadLink,isSupport}
})()