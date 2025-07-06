// ==UserScript==
// @name          SpankBang - Disable Thumbnail Previews
// @description   Stops thumbnails from running previews, unless the user hovers over the thumbnail.
// @author        VoltronicAcid
// @version       0.0.1
// @homepageURL   https://github.com/VoltronicAcid/spankbangDisableThumbnailPreview
// @supportURL    https://github.com/VoltronicAcid/spankbangDisableThumbnailPreview/issues
// @icon          https://www.google.com/s2/favicons?sz=64&domain=spankbang.com
// @match         http*://*spankbang.com/*
// @run-at        document-end 
// ==/UserScript==

if (document.location.pathname === "/") {
    const mutationFn = (mutations) => {
        mutations
            .filter(({ target }) => target.tagName === "VIDEO" && target.src)
            .forEach(mutation => {
                const { target } = mutation;
                const { parentElement: parent } = target;

                if (!parent.matches(":hover")) target.style.display = "none";
            });
    };
    const observer = new MutationObserver(mutationFn);
    document.querySelectorAll("a[x-data='videoItem']").forEach(div => {
        observer.observe(div, { attributes: true, attributeFilter: ['style'], childList: true, subtree: true, });
    });
} else {
    const mutationFn = (mutations, observer) => {
        mutations
            .forEach(mutation => {
                const { target } = mutation;
                const [videoDiv] = target.getElementsByClassName("video-js");

                if (videoDiv && mutation.oldValue === "video-item" && !target.matches(":hover")) {
                    videoDiv.style.display = "none";
                    target.classList.toggle("is_rotating", false);

                    observer.takeRecords();
                }
            });
    };
    const observer = new MutationObserver(mutationFn);
    Array.from(document.querySelectorAll("div.video-item"))
        .forEach((div) => {
            observer.observe(div, { attributes: true, attributeFilter: ['class'], attributeOldValue: true, });
        });
}
