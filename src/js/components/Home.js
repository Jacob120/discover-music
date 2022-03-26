import {select, templates} from '../settings.js';
import utils from '../utils.js';

class Home {
  constructor(element){
    const thisHome = this;

    thisHome.render(element);

  }

  render(element){
    const thisHome = this;

    /* generate HTML based on template */
    const generatedHTML = templates.homePage();
    /* create element using utils.createElementFromHTML */
    thisHome.element = utils.createDOMFromHTML(generatedHTML);
    
    /* find menu container */
    const homeContainer = document.querySelector(select.containerOf.home);
    /* add element to menu */
    
    homeContainer.appendChild(thisHome.element);
    
    
    thisHome.dom = {
      wrapper: element,
    };

    // thisHome.pages = document.querySelector(select.containerOf.pages).children;
    // thisHome.navBar = document.querySelectorAll(select.nav.links);

    // const idFromHash = window.location.hash.replace('#/', '');

    // let pageMatchingHash = thisHome.pages[0].id;

    // for(let page of thisHome.pages){
    //   if(page.id == idFromHash){
    //     pageMatchingHash = page.id;
    //     console.log(pageMatchingHash);
    //     break;
    //   } 
    // }

    // thisHome.activatePage(pageMatchingHash);
    // for(let link of thisHome.navLinks){
    //   link.addEventListener('click', function(event){
    //     const clickedElement = this;
    //     event.preventDefault();

    //     /*  get page id from href attribute*/

    //     const id = clickedElement.getAttribute('href').replace('#', '');

    //     /* run thisApp.activatePage with that id */

    //     thisHome.activatePage(id);

    //     /* change URL hash*/

    //     window.location.hash = '#/' + id;

    //   });
    // }
  }

}

export default Home;