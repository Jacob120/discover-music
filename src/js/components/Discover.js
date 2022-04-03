import {classNames, select, templates} from '../settings.js';
import utils from '../utils.js';

class Discover {
  constructor(id, data){
    const thisDiscover = this;

    thisDiscover.id = id;
    thisDiscover.data = data;
    
    thisDiscover.render();
    thisDiscover.getElements();
    thisDiscover.initActions();

  }

  render(){
    const thisDiscover = this;

    /* generate HTML based on template */
    const generatedHTML = templates.discoverPage(thisDiscover.data);
    /* create element using utils.createElementFromHTML */
    thisDiscover.element = utils.createDOMFromHTML(generatedHTML);
    
    /* find menu container */
    const discoverContainer = document.querySelector(select.containerOf.discover);
    /* add element to menu */
    
    discoverContainer.appendChild(thisDiscover.element);
  }

  getElements(){
    const thisDiscover = this;

    thisDiscover.playerWrapper = document.querySelectorAll(select.player.discoverWrapper); 
  }

  initActions(){
    const thisDiscover = this;

    const arr = Array.from(thisDiscover.playerWrapper);

    const randomNumber = Math.floor(Math.random() * arr.length) +1;
    console.log('randomnumber', randomNumber);

    arr.forEach((domElement) => {
      domElement.classList.add(classNames.elements.hidden);   
      
      if(domElement.id == randomNumber) {
        domElement.classList.remove(classNames.elements.hidden);
      }
    });
  }
}

export default Discover;