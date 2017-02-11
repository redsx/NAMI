const handleClipboard = (function(){
    let clipboardInput;
    function getclipboardElement(){
        clipboardInput = document.getElementById('clipboard') || {};
    }
    function setClipboardValue(value){
        clipboardInput || getclipboardElement();
        clipboardInput.value = value;
    }
    function clipboard(){
        try{
            clipboardInput.select();
            // clipboardInput.setSelectionRange(0, clipboardInput.value.length);
            const successful = document.execCommand('copy');
            return successful;
        } catch(err){
            console.error(err);
            return false;
        }
    }
    return {setClipboardValue,clipboard};
})()
export default handleClipboard;