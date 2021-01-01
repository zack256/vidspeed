function messageContext (msg) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": msg});
    });
}

function setSpeed (speed) {

    //var video = document.getElementsByTagName("VIDEO")[0];
    //video.playBackRate = speed;
}