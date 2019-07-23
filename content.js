chrome.runtime.sendMessage({ todo: 'showPageAction' });

// Injects additional script to broadcast value of utag_data.product_category
const s = document.createElement('script');
s.src = chrome.extension.getURL('sendUtagData.js');
(document.head || document.documentElement).appendChild(s);
s.onload = () => {
  s.remove();
};

const categories = {
  home: 'home',
  'mens-clothing': 'mens',
  'womens-clothing': 'womens',
  lifestyle: 'lifestyle',
  'beauty-products': 'beauty'
};

console.log(localStorage)
document.addEventListener('sendProductCategory', (event) => {
  // get category
  // check if category exists and is in categories
  // increment category and add back to 
});



// window.onload = () => {
//   setTimeout(() => {
//     console.log('HERE\'S THE UTAG ----->', window.utag_data, window);

//   }, 6000)

// };
//console.log(document.getElementsByClassName('c-product-add-to-cart__button')[0])

// if (window.href === 'https://www.urbanoutfitters.com/new-arrivals') {
//   // Logic to rearrange categories
// }

// if (window.utag_data.product_category && categories[window.utag_data.product_category]) {
//   const category = categories[window.utag_data.product_category];
//   const affinity = JSON.parse(localStorage.getItem('CSE_Challenge'));

//   console.log(category, affinity);
//   affinity[category]++;
//   localStorage.setItem('CSE_Challenge', JSON.stringify(affinity));

//   console.log(category, affinity)
// }
