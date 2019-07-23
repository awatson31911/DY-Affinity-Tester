document.addEventListener('DOMContentLoaded', (event) => {
  // const port = chrome.runtime.connect({ name: 'mainPort' });
  // console.log(port)
  // console.log('This is popup content loaded--->', event)

  chrome.runtime.sendMessage({ todo: 'getCategoryAffinities' }, (response) => {
    console.log('This is in the popup from the contentScript--->', response)
    const affinity = response;

    Object.keys(affinity).forEach((category) => {
      document.getElementById(category).textContent = affinity[category];
    });
  });

  // chrome.postMessage.addListener((message) => {

  //   if (message.todo === 'sendCategoryAffinities') {
  //     localStorage.setItem('CSE_Challenge', JSON.stringify(message.data));

  //     const affinity = message.data
  //     Object.keys(affinity).forEach((category) => {
  //       document.getElementById(category).textContent = affinity[category];
  //     });
  //   }
  //});


});

