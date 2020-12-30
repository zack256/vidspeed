function messageContext (msg) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, msg);
    });
}

function setSpeed (speed) {
    messageContext({"message" : "change_speed", "new_speed" : speed});
}

function initSpeedBtnHandlers () {
    var speedBtns = document.getElementsByClassName("speedBtn");
    for (var i = 0; i < speedBtns.length; i++) {
        (function() {
            var speedBtn = speedBtns[i];
            var speed = speedBtn.innerHTML;
            speedBtn.addEventListener("click", function () {
                setSpeed(parseFloat(speed));
            });
            console.log(speedBtn.innerHTML, parseFloat(speedBtn.innerHTML));
        }());
    }
}

initSpeedBtnHandlers();