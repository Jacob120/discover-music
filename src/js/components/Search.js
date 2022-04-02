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
    thisSearch.searchButton = document.querySelector(select.button.searchButton);
    thisSearch.searchResult = document.querySelector(select.search.searchResult);
  }

  initSearch(){
    const thisSearch = this;  

    const arr = Array.from(thisSearch.playerWrapper);  
    // console.log('length', arr.length);
    let result = [];
    let number = result.length;
    
    thisSearch.searchResult.innerHTML = arr.length;
    

    thisSearch.searchButton.addEventListener('click', function(event){
      event.preventDefault();

      const value = thisSearch.searchInput.value.toLowerCase();
      console.log(value);
      arr.forEach((domElement) => {        
   
        const isVisible = domElement.textContent.toLowerCase().includes(value);

        if(isVisible == true){
          domElement.classList.remove(classNames.elements.hidden);
          if(!result.includes(domElement)){
            result.push(domElement);
          }
        } else if(!isVisible){
          domElement.classList.add(classNames.elements.hidden);
          if(result.includes(domElement)){
            const idIndex = result.indexOf(domElement);
            result.splice(idIndex, 1);  
          }
        }
        console.log('length', result.length);
        thisSearch.searchResult.innerHTML = result.length;
      });
    }); 
    console.log('number', number);
  }
 
}

export default Search;