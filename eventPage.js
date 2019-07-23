let categoryData;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.todo === 'showPageAction') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.pageAction.show(tabs[0].id);
    });
  
  } else if (request.todo === 'sendCategoryAffinities') {
    categoryData = request.data;
  
  } else if (request.todo === 'getAffinities') {
    sendResponse(categoryData);
  }

});