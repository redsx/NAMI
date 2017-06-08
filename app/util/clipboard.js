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
    function insertAtCursor(myField, myValue, needSelect = false) {
        const length = myValue.length;
        if (document.selection) {
            console.log('ie');
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
        }
        else if (myField.selectionStart || myField.selectionStart === '0') {
            const startPos = myField.selectionStart;
            const endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                + myValue
                + myField.value.substring(endPos, myField.value.length);
            if(needSelect){
                myField.selectionStart = startPos;
                myField.selectionEnd = startPos + length;
            }
        } else {
            myField.value += myValue;
        }
    } 
    return {setClipboardValue,clipboard,insertAtCursor};
})()
export default handleClipboard;