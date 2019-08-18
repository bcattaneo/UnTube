// General
const checkTimeout = 500;
const toggleId = 'untube-toggle';

// YouTube page classes/ids
const relatedIds = ['secondary-inner', 'related'];
const relatedClasses = ['ytd-playlist-panel-renderer'];
const adsClasses = ['ytp-ad-overlay-slot', 'ytp-ad-preview-image'];
const endScreenClasses = [
    'ytp-ce-element-show', 'ytp-endscreen-content',
    'ytp-endscreen-next', 'ytp-endscreen-prev',
    'ytp-endscreen-previous'
];
const cancelButtonClass = 'ytp-upnext-cancel-button';
const skipButtonClass = 'ytp-ad-skip-button';

// Get flags
let hideRelated = true;
let hideStored = browser.storage.sync.get();
hideStored.then(gotRelatedConfig, errorRelatedConfig);
let hideAds = true;

// Listener for state changes
browser.runtime.onMessage.addListener(request => {
    hideRelated = request.untubeRelated;
});

// Create shared objects and start main loop
loop();

function toggleRelated(on) {
    relatedIds.forEach(function(e){
        let relatedBox = document.getElementById(e);
        relatedBox.style.filter = `blur(${on ? '10' : '0'}px)`;
    })

    relatedClasses.forEach(function(e){
        let relatedBox = document.getElementsByClassName(e)[0];
        relatedBox.style.filter = `blur(${on ? '10' : '0'}px)`;
    })
}

// Hide/show specific classnames
function hideShowAll(classNames, flag) {
    classNames.forEach(function(c){
        let boxes = document.getElementsByClassName(c);
        if (boxes.length > 0) {
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].style.display = flag ? "none" : "inline";
            }
        }
    });
}

function gotRelatedConfig(obj){
    hideRelated = obj.untubeRelated;
}

function errorRelatedConfig(obj){
    hideRelated = false;
}

// Main loop
function loop() {
    // Hide related
    try {
        toggleRelated(hideRelated);
    } catch (ex) {}

    // Hide regular ads
    try {
        hideShowAll(adsClasses, hideAds);
    } catch (ex) {}

    // Hide endscreen suggestions
    try {
        hideShowAll(endScreenClasses, hideRelated);
    } catch (ex) {}

    // Trigger endscreen cancel button
    try {
        if (hideRelated) {
            let cancelButtons = document.getElementsByClassName(cancelButtonClass);
            if (cancelButtons.length > 0) {
                cancelButtons[0].click();
            }
        }
    } catch (ex) {}

    // Trigger skip ad button
    try {
        let skipButtons = document.getElementsByClassName(skipButtonClass);
        if (skipButtons.length > 0) {
            skipButtons[0].click();
        }
    } catch (ex) {}

    setTimeout(loop, checkTimeout);
}