

console.log(window.utag_data.product_category)
setTimeout(() => {
  document.dispatchEvent(new CustomEvent('sendProductCategory', {
    category: window.utag_data.product_category // Send product category from global window 
  }));
}, 0);

  // document.dispatchEvent(new CustomEvent('sendProductCategory', {
  //   category: window.utag_data.product_category // Send product category from global window 
  // }));
