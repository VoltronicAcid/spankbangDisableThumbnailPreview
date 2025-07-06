// ==UserScript==
// @name          SpankBang - Disable Thumbnail Previews
// @description   Stops thumbnails from running previews, unless the user hovers over the thumbnail.
// @author        VoltronicAcid
// @version       0.0.2
// @homepageURL   https://github.com/VoltronicAcid/spankbangDisableThumbnailPreview
// @supportURL    https://github.com/VoltronicAcid/spankbangDisableThumbnailPreview/issues
// @icon          https://www.google.com/s2/favicons?sz=64&domain=spankbang.com
// @match         http*://*spankbang.com/*
// @run-at        document-end 
// ==/UserScript==

document.querySelectorAll(".js-media-list")
    .forEach(list => {
        const mutationFn = (mutations, observer) => {
            mutations
                .forEach(mutation => {
                    const { target } = mutation;
                    if (target.tagName !== "VIDEO" || !target.src) return;
                    const { parentElement: parent } = target;

                    if (!parent.matches(":hover")) {
                        target.style.display = "none";
                        observer.takeRecords();
                    }
                });
        };
        const observer = new MutationObserver(mutationFn);

        list.querySelectorAll("a[x-data='videoItem']").forEach(link => {
            observer.observe(link, { attributes: true, attributeFilter: ['style'], childList: true, subtree: true, });
        });
    });

document.querySelectorAll("div.video-item")
    .forEach((div) => {
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

        observer.observe(div, { attributes: true, attributeFilter: ['class'], attributeOldValue: true, });
    });
