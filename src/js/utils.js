
const utils = {}; // eslint-disable-line no-unused-vars

utils.createDOMFromHTML = function(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div;
};

utils.createDOMListFromHTML = function(htmlString) {
  let list = document.createElement('li');
  list.innerHTML = htmlString.trim();
  return list;
};

export default utils;