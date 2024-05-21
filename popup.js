chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "displayZoomLevelValue"}, function(response) {
        document.getElementById("zoomLevelValue").innerHTML = response.zoomLevel * 100 + "%"
    });
});