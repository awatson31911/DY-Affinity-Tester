document.addEventListener('DOMContentLoaded', () => {

  const getAffinities = () => {
    chrome.runtime.sendMessage({ todo: 'getAffinities' }, (response) => {
      const affinity = response;

      localStorage.setItem('CSE_Challenge', JSON.stringify(affinity));

      Object.keys(affinity).forEach((category) => {
        document.getElementById(category).textContent = affinity[category];
      });
    });
  };

  document.getElementById('clear-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { todo: 'clearAffinities' }, (response) => {
        const affinity = response;
        localStorage.setItem('CSE_Challenge', JSON.stringify(affinity));

        Object.keys(affinity).forEach((category) => {
          document.getElementById(category).textContent = affinity[category];
        });
      });
    });
  });

  getAffinities();

});