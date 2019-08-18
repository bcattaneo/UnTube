// Get flags
let hideRelated = true;
chrome.storage.local.get('untubeRelated', function(value){
    hideRelated = value ? value : false;
    chrome.browserAction.setBadgeText({text: hideRelated ? "on" : "off"});
    chrome.browserAction.setBadgeBackgroundColor({color: hideRelated ? "green" : "red"});
});
let hideAds = true;

function gotRelatedConfig(obj){
    hideRelated = obj.untubeRelated;
    chrome.browserAction.setBadgeText({text: hideRelated ? "on" : "off"});
    chrome.browserAction.setBadgeBackgroundColor({color: hideRelated ? "green" : "red"});
}

function changeState() {
    hideRelated = !hideRelated;
    chrome.browserAction.setBadgeText({text: hideRelated ? "on" : "off"});
    chrome.browserAction.setBadgeBackgroundColor({color: hideRelated ? "green" : "red"});
    chrome.storage.local.set({'untubeRelated': hideRelated});
}

chrome.browserAction.onClicked.addListener(function(tabs) {
    changeState();
    chrome.tabs.query({
        currentWindow: true
    }, function(tabs){
        // Send message to content script
        for (let tab of tabs) {
            chrome.tabs.sendMessage(
                tab.id,
                {untubeRelated: hideRelated}
            );
        }
    });
});