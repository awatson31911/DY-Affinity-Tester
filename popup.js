document.addEventListener('DOMContentLoaded', () => {

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

  // Sets Initial Values session values with affinities from prior sessions
  const affinity = JSON.parse(localStorage.getItem('CSE_Challenge'));

  Object.keys(affinity).forEach((category) => {
    document.getElementById(category).textContent = affinity[category];
  });


  // load prior affinity amounts 
  // set prior affinity amounts 
  // get url
  // check if "https://www.urbanoutfitters.com/shop/*"
  // IF true check category 
  // increase category count by 1
  //add on click event to button 
  // **** onClick should check for error popup
  // onClick increase category count by 3
});

