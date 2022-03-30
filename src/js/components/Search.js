import {select, templates} from '../settings.js';
import utils from '../utils.js';

class Search {
  constructor(id, data){
    const thisSearch = this;

    thisSearch.id = id;
    thisSearch.data = data;

    thisSearch.render();
  }

  render(){
    const thisSearch = this;

    /* generate HTML based on template */
    const generatedHTML = templates.searchPage(thisSearch.data);
    /* create element using utils.createElementFromHTML */
    thisSearch.element = utils.createDOMFromHTML(generatedHTML);
    
    /* find menu container */
    const searchContainer = document.querySelector(select.containerOf.search);
    /* add element to menu */    
    searchContainer.appendChild(thisSearch.element);    
  }  
}

export default Search;