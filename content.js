function setSpeedHTML (speed) {
    console.log(speed);
    var video = document.getElementsByTagName("VIDEO")[0];
    console.log(video);
    video.playbackRate = speed;
    console.log(video.playbackRate);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        if( request.message === "clicked_browser_action" ) {
            console.log("hey there.");
        } else if (request.message == "change_speed") {
            setSpeedHTML(request.new_speed);
        } 
    }
  );