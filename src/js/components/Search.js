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

  // getElements(element) {
  //   const thisSearch = this;

  //   thisSearch.dom = {
  //     wrapper: element,
  //     gapPlayer: element.querySelector(select.player.wrapper),
  //     authorAndTitle: element.querySelector(select.player.author_title),
  //     songDescription: element.querySelector(select.player.description),  //     
  //   };

 
    
  // }

  getElements(){
    const thisSearch = this;

    thisSearch.gapPlayer = thisSearch.element.querySelector(select.player.wrapper);
    thisSearch.authorAndTitle = thisSearch.element.querySelector(select.player.author_title);
    thisSearch.songDescription = thisSearch.element.querySelector(select.player.description);
    thisSearch.searchInput  = document.querySelector(select.search.input);
    thisSearch.searchList = document.querySelectorAll('.search-li');   
    

    // console.log('gapPlayer', thisSearch.gapPlayer);
    // console.log('authorandtitle', thisSearch.authorAndTitle.textContent);
    // console.log('songDescription', thisSearch.songDescription);
    console.log('searchList', thisSearch.searchList);

  }

  initSearch(){
    const thisSearch = this;


      
    thisSearch.searchInput.addEventListener('input', function(e){
      const value = e.target.value.toLowerCase();
      console.log(value);

      // for(const listElement of thisSearch.searchList){
      //   let list = listElement.textContent.toLowerCase();

      //   if(list.includes(value)){
      //     listElement.style.display = 'block';
      //   } else {
      //     listElement.style.display = 'none';
      //   }
      // }

      thisSearch.searchList.forEach(list => {

        const isVisible = thisSearch.authorAndTitle.textContent.includes(value) || thisSearch.songDescription.textContent.includes(value);
        // console.log('player', player);
        list.classList.toggle(classNames.elements.hidden, !isVisible);
        console.log('list', list);
      });
      
 
    });
  }
}

export default Search;