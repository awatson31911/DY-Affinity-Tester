document.addEventListener('DOMContentLoaded', () => {

  const getAffinities = () => {
    chrome.runtime.sendMessage({ todo: 'getAffinities' }, (response) => {
      const affinity = response;
      let newAffinity;

      affinity && localStorage.setItem('CSE_Challenge', JSON.stringify(affinity));
      newAffinity = JSON.parse(localStorage.getItem('CSE_Challenge'))

      Object.keys(newAffinity).forEach((category) => {
        document.getElementById(category).textContent = newAffinity[category];
      });
    });
  };

  document.getElementById('clear-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { todo: 'clearAffinities' }, (response) => {
        const affinity = response;
        let newAffinity;

        localStorage.setItem('CSE_Challenge', JSON.stringify(affinity));
        newAffinity = JSON.parse(localStorage.getItem('CSE_Challenge'))
        document.querySelector('body').style.backgroundColor = 'red'; 
        Object.keys(newAffinity).forEach((category) => {
          document.getElementById(category).textContent = newAffinity[category];
        });
      });
    });
  });

  getAffinities();

});