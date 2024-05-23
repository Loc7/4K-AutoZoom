const minWidth = 1980;
const zoomLarge = 2;
const zoomSmall = 1;
let previousWindowWidth = window.outerWidth;
let zoomLevelCounter = 0;
let bypassPopup = false;
let zoomLevel = zoomSmall;
let isHotkeyTriggered = false;

function setZoom() {
  if (!isHotkeyTriggered) {
    const windowWidth = window.outerWidth;
    zoomLevel = windowWidth > minWidth ? zoomLarge : zoomSmall;

    //Chrome bug: Unnecessarily triggers resize event with outerWidth 0 if opening link in new tab with middle mouse button click. Checking for windowWidth 0 handles this bug.
    if (
      previousWindowWidth !== windowWidth ||
      (zoomLevelCounter == 0 && windowWidth > 0)
    ) {
      if (
        (windowWidth > minWidth || previousWindowWidth !== windowWidth) &&
        !bypassPopup
      ) {
        showPopup();
      }
      previousWindowWidth = windowWidth;
      chrome.runtime.sendMessage({ type: "setZoom", zoomLevel });
      zoomLevelCounter += 1;
    }
  }
  isHotkeyTriggered = false;
}

function showPopup() {
  let iframe = document.createElement("iframe");
  iframe.style.cssText =
    "position: fixed; display: block; z-index: 999999999; border: 0; top: 0; right: 0; color-scheme: auto; pointer-events: none;";
  iframe.src = chrome.runtime.getURL("popup.html");
  let bodyTag = document.getElementsByTagName("body")[0];
  bodyTag.prepend(iframe);

  setTimeout(() => {
    iframe.remove();
  }, 1500);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "displayZoomLevelValue") {
    sendResponse({ zoomLevel });
  }
  if (message.type === "hotkeyTrigger") {
    showPopup();
    zoomLevel = message.zoomLevel;
    isHotkeyTriggered = true;
    chrome.runtime.sendMessage({
      type: "setZoom",
      zoomLevel: message.zoomLevel,
    });
  }
});

window.addEventListener("resize", setZoom);

window.addEventListener("keydown", () => (bypassPopup = true));
window.addEventListener("keyup", () => (bypassPopup = false));

setZoom();
