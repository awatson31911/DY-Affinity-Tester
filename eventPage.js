// chrome.runtime.onConnect.addListener((port) => {
//   console.assert(port.name === 'mainPort');

//   port.onMessage.addListener((request, sender) => {
//     console.log('This is from the event page -----> ', request)
//     if (request.todo === 'showPageAction') {
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.pageAction.show(tabs[0].id);
//       });
//     }

//     if (request.todo === 'sendCategoryAffinities') {
//       port.postMessage({ todo: 'sendCategoryAffinities', data: request.data })

//     }
//   });
// });


let categoryData;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.todo === 'showPageAction') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.pageAction.show(tabs[0].id);
    });
  } else if (request.todo === 'sendCategoryAffinities') {
    categoryData = request.data
    console.log("this is the request from the content-->",request)
  } else if (request.todo === 'getCategoryAffinities') {
    console.log("this is the request from the popup-->", categoryData)
    sendResponse(categoryData)
  }
});