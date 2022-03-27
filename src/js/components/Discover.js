import {select, templates} from '../settings.js';
import utils from '../utils.js';

class Discover {
  constructor(element){
    const thisDiscover = this;

    thisDiscover.render(element);

  }

  render(element){
    const thisDiscover = this;

    /* generate HTML based on template */
    const generatedHTML = templates.discoverPage();
    /* create element using utils.createElementFromHTML */
    thisDiscover.element = utils.createDOMFromHTML(generatedHTML);
    
    /* find menu container */
    const discoverContainer = document.querySelector(select.containerOf.discover);
    /* add element to menu */
    
    discoverContainer.appendChild(thisDiscover.element);
    
    
    thisDiscover.dom = {
      wrapper: element,
    };
  }

}

export default Discover;