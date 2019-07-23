chrome.runtime.sendMessage({ todo: 'showPageAction' });

// const port = chrome.runtime.connect({name: 'mainPort'});
// port.postMessage({ todo: 'showPageAction' });

/* --------------------------------------------------------------------*/
// Injects additional script to broadcast value of utag_data.product_category
const scriptInject = document.createElement('script');

scriptInject.src = chrome.extension.getURL('sendUtagData.js');

(document.head || document.documentElement).appendChild(scriptInject);

scriptInject.onload = () => {
  scriptInject.remove();
};
/* --------------------------------------------------------------------*/

if (!localStorage.getItem('CSE_Challenge')) {
  const initialValues = {
    mens: 0,
    womens: 0,
    lifestyle: 0,
    home: 0,
    beauty: 0
  };
  localStorage.setItem('CSE_Challenge', JSON.stringify(initialValues));
} 

const affinity = JSON.parse(localStorage.getItem('CSE_Challenge'));

const categories = {
  home: 'home',
  'mens-clothing': 'mens',
  'womens-clothing': 'womens',
  lifestyle: 'lifestyle',
  'beauty-products': 'beauty'
};

let category;

document.addEventListener('sendProductCategory', (event) => {
  category = event.detail[0].split(',')[0];
  console.log('This is the event from the injected script--->', category);
  
  if (category && categories[category]) {
    console.log(affinity)
    affinity[categories[category]]++;
    localStorage.setItem('CSE_Challenge', JSON.stringify(affinity));
    console.log(affinity)
  }
});



//port.postMessage({ todo: 'sendCategoryAffinities', data: affinity });
chrome.runtime.sendMessage({ todo: 'sendCategoryAffinities', data: affinity});


if (window.href === 'https://www.urbanoutfitters.com/new-arrivals') {
  // Logic to rearrange categories
}