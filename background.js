chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "setZoom") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        try {
          chrome.tabs.setZoom(tabs[0].id, message.zoomLevel);
 
        } catch {}
      });
  }
});

// With Manifest V3, Chrome kills background scripts after 5 minutes and therefore AutoZoom won't work any longer if the user comes back to a previous tab after more than 5 minutes. So, I used a keepAlive-hack by w0xx0m: https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension/
const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();
