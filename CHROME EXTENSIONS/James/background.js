chrome.runtime.onInstalled.addListener(async () => {
    let url = chrome.runtime.getURL("popup.html");

    try {
        let tab = await chrome.tabs.create({ url });
        
        if (tab && tab.id) {
            console.log(`Created tab ${tab.id}`);
        } else {
            console.error('Error creating tab. Tab or tab.id is undefined.');
        }
    } catch (error) {
        console.error('Error creating tab:', error.message);
    }
});
