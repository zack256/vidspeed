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
        }());
    }
}

function initSpeedInpHandler () {
    var inp = document.getElementById("speedInp");
    var btn = document.getElementById("speedInpBtn");
    inp.addEventListener("keyup", function (e) {
        if (e.key == "Enter") {
            btn.click();
        }
    });
    btn.addEventListener("click", function () {
        setSpeed(parseFloat(inp.value));
    });
}

function manualSelectVideo () {
    var p = document.getElementById("manualSelectMsg");
    var btn = document.getElementById("manualSelectBtn");
    p.innerHTML = "Selecting video";
    btn.innerHTML = "Cancel";
    messageContext({"message" : "manual_select"});
}

function initManualHandlers () {
    var btn = document.getElementById("manualSelectBtn");
    btn.addEventListener("click", function () {
        manualSelectVideo();
    });
}

function initEventHandlers () {
    initSpeedBtnHandlers();
    initSpeedInpHandler();
    initManualHandlers();
}

initEventHandlers();