chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

    if (msg.data) {
        for (var i = 0, length = msg.data.length; i < length; i++) {
            document.forms[0][msg.data[i].name].value = msg.data[i].value;
        }
        sendResponse('Success');
    } else {
        sendResponse('Msg is not defined');
    }

    return true;
});
