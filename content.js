chrome.runtime.sendMessage({ todo: 'showPageAction' });

const initialValues =
  JSON.parse(localStorage.getItem('CSE_Challenge'))
    ? JSON.parse(localStorage.getItem('CSE_Challenge'))
    : {
      womens: 0,
      mens: 0,
      lifestyle: 0,
      home: 0,
      beauty: 0
    };

// Send initial session values to popup
chrome.runtime.sendMessage({ todo: 'sendCategoryAffinities', data: initialValues }, () => {
});


// Only see if we need to increment affinity on individual/shop pages
const regex = /https:\/\/www\.urbanoutfitters\.com\/shop\/*/g;
if (window.location.href.match(regex)) {

  /* --------------------------------------------------------------------*/
  // Injects additional script to broadcast value of utag_data.product_category
  const scriptInject = document.createElement('script');
  scriptInject.src = chrome.extension.getURL('sendUtagData.js');
  (document.head || document.documentElement).appendChild(scriptInject);
  scriptInject.onload = () => {
    scriptInject.remove();
  };
  /* --------------------------------------------------------------------*/

  document.addEventListener('sendProductCategory', (event) => {
    const categories = {
      home: 'home',
      'mens-clothing': 'mens',
      'womens-clothing': 'womens',
      lifestyle: 'lifestyle',
      'beauty-products': 'beauty'
    };
    // Store category from injected script in variable
    console.log(event.detail)
    const category = event.detail[0].split(',')[0];

    if (!localStorage.getItem('CSE_Challenge')) {
      localStorage.setItem('CSE_Challenge', JSON.stringify(initialValues));
    }

    const affinity = JSON.parse(localStorage.getItem('CSE_Challenge'));

    if (category && categories[category]) {
      // Increments affinity as soon as a product page w/notable category is entered 
      affinity[categories[category]]++;


      /* ------------------------------------------------------------ */
      // Adds click event to Add To Bag button to increment affinity
      const addToBagButton = document.querySelector('button.c-product-add-to-cart__button');
      
      addToBagButton.addEventListener('click', (event) => {
        event.stopPropagation;
        const errorMsg = document.querySelector('div.js-product-message p.c-product-message__info--error');

        if (!errorMsg) {
          affinity[categories[category]] += 3;
          localStorage.setItem('CSE_Challenge', JSON.stringify(affinity));
          chrome.runtime.sendMessage({ todo: 'sendCategoryAffinities', data: affinity });
        }
      });

      localStorage.setItem('CSE_Challenge', JSON.stringify(affinity));
      chrome.runtime.sendMessage({ todo: 'sendCategoryAffinities', data: affinity });
    }

  });

}

/* ------------------------------------------------------------ */
// Clear Affinity values logic 
chrome.runtime.onMessage.addListener((request) => {
  if (request.todo === 'clearAffinities') {

    const resetValues = {
      mens: 0,
      womens: 0,
      lifestyle: 0,
      home: 0,
      beauty: 0
    };

    localStorage.setItem('CSE_Challenge', JSON.stringify(resetValues));
    chrome.runtime.sendMessage({ todo: 'sendCategoryAffinities', data: resetValues });
  }

});
/* ------------------------------------------------------------ */