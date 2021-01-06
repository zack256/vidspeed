var chosenVideo;

function setSpeedHTML (speed) {
    //var video = document.getElementsByTagName("VIDEO")[0];
    if (typeof chosenVideo == "undefined") {
        chosenVideo = basicGetVideo();
    }
    chosenVideo.playbackRate = speed;
}

function basicGetVideo () {
    chosenVideo = document.getElementsByTagName("VIDEO")[0];
}

function mineVideo (x, y) {
    var elements = [];
    var elementOver;
    var videoElement;
    while (true) {
        elementOver = document.elementFromPoint(x, y);
        if (elementOver.tagName == "HTML") {
            videoElement = null;
            break;
        } else if (elementOver.tagName == "VIDEO") {
            videoElement = elementOver;
            break;
        } else {
            elements.push(elementOver);
            elementOver.style.pointerEvents = "none";
        }
    }
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.pointerEvents = "";
    }
    return videoElement;
}

function addCover () {
    var cover = document.createElement("DIV");
    cover.id = "vidSpeedCover";
    $("BODY")[0].appendChild(cover);
}

function hideCover () {
    var cover = document.getElementById("vidSpeedCover");
    if (typeof cover != "undefined") {
        $("BODY")[0].removeChild(cover);
    }
}

function manualSelect () {
    addCover();
    $(window).click(function (e) {
        var videoElement = mineVideo(e.clientX, e.clientY);
        if (videoElement == null) { // change?
            //pass
        } else {
            chosenVideo = videoElement;
        }
        hideCover();
    });
}

$(document).ready(function () {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.message === "clicked_browser_action" ) {
                console.log("hey there.");
            } else if (request.message == "change_speed") {
                setSpeedHTML(request.new_speed);
            } else if (request.message == "manual_select") {
                manualSelect();
            }
        }
      );
});