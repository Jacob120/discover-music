import {select, templates} from '../settings.js';
import utils from '../utils.js';

class Search {
  constructor(element){
    const thisSearch = this;

    thisSearch.render(element);

  }

  render(element){
    const thisSearch = this;

    /* generate HTML based on template */
    const generatedHTML = templates.homePage();
    /* create element using utils.createElementFromHTML */
    thisSearch.element = utils.createDOMFromHTML(generatedHTML);
    console.log('search', thisSearch.element);
    /* find menu container */
    const searchContainer = document.querySelector(select.containerOf.search);
    /* add element to menu */
    
    searchContainer.appendChild(thisSearch.element);
    
    
    thisSearch.dom = {
      wrapper: element,
    };

    // thisSearch.pages = document.querySelector(select.containerOf.pages).children;
    // thisSearch.navBar = document.querySelectorAll(select.nav.links);

    // const idFromHash = window.location.hash.replace('#/', '');

    // let pageMatchingHash = thisSearch.pages[0].id;

    // for(let page of thisSearch.pages){
    //   if(page.id == idFromHash){
    //     pageMatchingHash = page.id;
    //     console.log(pageMatchingHash);
    //     break;
    //   } 
    // }

    // thisSearch.activatePage(pageMatchingHash);
    // for(let link of thisSearch.navLinks){
    //   link.addEventListener('click', function(event){
    //     const clickedElement = this;
    //     event.preventDefault();

    //     /*  get page id from href attribute*/

    //     const id = clickedElement.getAttribute('href').replace('#', '');

    //     /* run thisApp.activatePage with that id */

    //     thisSearch.activatePage(id);

    //     /* change URL hash*/

    //     window.location.hash = '#/' + id;

    //   });
    // }
  }

  // activatePage(pageId){
  //   const thisSearch = this;

  //   /* add class "active" to matching pages. remove from non-matching */

  //   for(let page of thisSearch.pages){
  //     page.classList.toggle(classNames.pages.active, page.id == pageId);
  //   }

  //   /* add class "active" to matching links. remove from non-matching */

  //   for(let link of thisSearch.navBar){
  //     link.classList.toggle(
  //       classNames.nav.active, 
  //       link.getAttribute('href') == '#' + pageId
  //     );
  //   }

  // }  
}

export default Search;