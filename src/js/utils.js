
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

utils.createDOMOptionFromHTML = function(htmlString) {
  let option = document.createElement('option');
  option.classList.add('category-option');
  option.innerHTML = htmlString.trim();
  option.value = option.textContent;
  return option;
};

export default utils;