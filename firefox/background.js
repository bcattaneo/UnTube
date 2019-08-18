// Get flags
let hideRelated = true;
let hideStored = browser.storage.sync.get();
hideStored.then(gotRelatedConfig, errorRelatedConfig);
let hideAds = true;

function gotRelatedConfig(obj){
    hideRelated = obj.untubeRelated;
    browser.browserAction.setBadgeText({text: hideRelated ? "on" : "off"});
    browser.browserAction.setBadgeBackgroundColor({color: hideRelated ? "green" : "red"});
}

function errorRelatedConfig(obj){
    hideRelated = false;
    browser.browserAction.setBadgeText({text: hideRelated ? "on" : "off"});
    browser.browserAction.setBadgeBackgroundColor({color: hideRelated ? "green" : "red"});
}

function changeState(tabs) {
    hideRelated = !hideRelated;
    browser.browserAction.setBadgeText({text: hideRelated ? "on" : "off"});
    browser.browserAction.setBadgeBackgroundColor({color: hideRelated ? "green" : "red"});
    browser.storage.sync.set({
        untubeRelated: hideRelated
    });

    // Send message to content script
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            {untubeRelated: hideRelated}
        );
    }
}
//browser.browserAction.onClicked.addListener(changeState);
browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({
        currentWindow: true
    }).then(changeState);
});