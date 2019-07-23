setTimeout(() => {
  // Send product category from global window
  document.dispatchEvent(new CustomEvent('sendProductCategory', {
    detail: window.utag_data.product_category
  }));
}, 0);
