# Affinity Tester
 A Chrome Extension to track a user's affinity to different content and change UI based on it. This Extension focuses on the New Arrivals Page of the Urban Outfitters website.


## Technologies/Services Used
- Javascript
- Google Chrome Extension API
- HTML
- CSS

## Summary
Information is taken from the web page and sent back to the extension to display a user's affinity for specific categories: women's fashion, men's fashion, beauty, home and lifestyle. The extension also rearranges the New-Arrivals page to place higher ranking categories closer to the top of the page.

The extension uses chrome messaging to communicate from the web page to the extension and vice versa. Namely the functions:

```
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

}
```

and 

```
chrome.runtime.sendMessage({ })
```

Information is transferred from the UO webpage, via content.js, to the background page eventPage.js then to the extension's popup.js.