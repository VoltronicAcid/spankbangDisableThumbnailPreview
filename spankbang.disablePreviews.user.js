// ==UserScript==
// @name          SpankBang - Disable Thumbnail Previews
// @description   Stops thumbnails from running previews, unless the user hovers over the thumbnail.
// @author        VoltronicAcid
// @version       0.0.1
// @homepageURL   https://github.com/VoltronicAcid/spankbangDisableThumbnailPreview
// @supportURL    https://github.com/VoltronicAcid/spankbangDisableThumbnailPreview/issues
// @icon          https://www.google.com/s2/favicons?sz=64&domain=spankbang.com
// @match         http*://*spankbang.com/*
// @run-at        document-idle 
// ==/UserScript==

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            // Search results page

            if (mutation.target.tagName == 'DIV' && mutation.target.classList.contains('video-js') && !mutation.previousSibling) {
                if (mutation.target.parentElement && mutation.target.parentElement.matches(':hover')) {
                    // User hovered for a preview. Doing nothing.
                } else {
                    // Programmatically triggerered by the site. Disabling.

                    try {
                        mutation.target.setAttribute('style', 'display: none');
                        jQuery(mutation.target).parents('.is_rotating').removeClass('is_rotating'); // blinking
                    } catch { };
                };
            };
        } else if (mutation.type === "attributes") {
            // Main page & other areas

            //if (mutation.target.tagName == 'VIDEO') try {jQuery('[id^=recommended_video],.js-video-item video').hide()} catch {};

            if (mutation.target.tagName == 'VIDEO' && mutation.attributeName == 'style' && !mutation.target.getAttribute('style') && !mutation.previousSibling) {
                if (mutation.target.parentElement && mutation.target.parentElement.matches(':hover')) {
                    // User hovered for a preview. Doing nothing.
                } else {
                    // Programmatically triggerered by the site. Disabling.

                    try { mutation.target.setAttribute('style', 'display: none') } catch { };
                };
            };
        };
    };
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
jQuery(".js-media-list,.video-list").each((_, grid) => {
    //console.log('set observer on', x);
    observer.observe(grid, config);
});
