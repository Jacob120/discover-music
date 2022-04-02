import {select, templates, classNames} from '../settings.js';
import utils from '../utils.js';

class Search {
  constructor(id, data){
    const thisSearch = this;
    
    thisSearch.id = id;
    thisSearch.data = data;

    thisSearch.render();
    thisSearch.getElements();
    thisSearch.initSearch();

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

  getElements(){
    const thisSearch = this;

    thisSearch.playerWrapper = document.querySelectorAll(select.player.wrapper); 
    thisSearch.searchInput  = document.querySelector(select.search.input);  
  }

  initSearch(){
    const thisSearch = this;  

    const arr = Array.from(thisSearch.playerWrapper);  
    
    thisSearch.searchInput.addEventListener('input', function(e){
      const value = e.target.value.toLowerCase(); 
      
      arr.forEach((domElement) => {        
   
        const isVisible = domElement.textContent.toLowerCase().includes(value) ||
                        domElement.textContent.toLowerCase().includes(value);  

        domElement.classList.toggle(classNames.elements.hidden, !isVisible);  
      });
    }); 
  }
 
}

export default Search;