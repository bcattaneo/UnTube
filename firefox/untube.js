// General
const checkTimeout = 2000;
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

// Toggle flags
let hideRelated = true;
let hideAds = true;

// Create shared objects and start main loop
// createToggleBox();
createSharedObjects();
loop();

// Create shared objects
function createSharedObjects() {
    var sharedObj = {
        toggleRelated: function() {
            hideRelated = !hideRelated;
        }
    };
    window.wrappedJSObject.sharedObj = cloneInto(
        sharedObj,
        window,
        {cloneFunctions: true}
    );
}

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

// function createToggleBox() {
//     var link = document.createElement("a");
//     var box = document.createElement("div");
//     link.setAttribute("href", "javascript:window.sharedObj.toggleRelated();");
//     box.style.position = "fixed";
//     box.style.width = "50px";
//     box.style.height = "50px";
//     box.style.bottom = "0px";
//     box.style.right = "0px";
//     box.style.marginRight = "10px";
//     box.style.marginBottom = "10px";
//     box.style.background = "#FF0000";
//     box.style.boxShadow = "0px 0px 5px 0px rgba(107,107,107,1)";
//     link.appendChild(box);
//     document.body.appendChild(link);
// }

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

    // Add toggle button
    // try {
    //     let toggleBox = document.getElementById(toggleId);
    //     if (!toggleBox) {
    //         createToggleBox();
    //     }
    // } catch (ex) {}

    setTimeout(loop, checkTimeout);
}