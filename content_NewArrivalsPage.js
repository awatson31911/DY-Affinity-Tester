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

  document.querySelectorAll('div[data-qa-module-type=categoryProductTray]')[index].replaceWith(replacementNode);
  index++;
}