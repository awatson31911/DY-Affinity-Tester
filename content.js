chrome.runtime.sendMessage({ todo: 'showPageAction' });

const initialValues =
  JSON.parse(localStorage.getItem('CSE_Challenge'))
    ? JSON.parse(localStorage.getItem('CSE_Challenge'))
    : {
      mens: 0,
      womens: 0,
      lifestyle: 0,
      home: 0,
      beauty: 0
    };

// Send initial session values to popup
chrome.runtime.sendMessage({ todo: 'sendCategoryAffinities', data: initialValues }, () => {
  console.log('initial values from content------>', initialValues)
});


// Only see if we can increment affinity on individual/shop pages
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

  });

}

/* ---------------------------------------------------------------- */
// Logic to rearrange categories
if (window.location.href === 'https://www.urbanoutfitters.com/new-arrivals') {

  const changePage = () => {
    const affinity = JSON.parse(localStorage.getItem('CSE_Challenge'));

    const sanitizeHeader = (header) => {
      return header.replace('\'', '').toLowerCase();
    };

    const nodes = Array.from(document.querySelectorAll('div[data-qa-module-type=categoryProductTray]'))
      .map((node) => {
        const category = node.querySelector('h2.c-product-tray__h2').innerText;
        const cleanCategory = sanitizeHeader(category);
        const score = affinity[cleanCategory];
        node = node.cloneNode(true);
        return { node, score: score };
      })
      .sort((a, b) => b.score - a.score);
    
    let index = 0;
    while (index <= 4) {
      const replacementNode = nodes[index].node;

      document.querySelectorAll('div[data-qa-module-type=categoryProductTray]')[index].replaceWith(replacementNode)
      index++;
    }
  };

  changePage();

}