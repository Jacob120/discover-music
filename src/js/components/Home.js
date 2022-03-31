import {select, templates} from '../settings.js';
import utils from '../utils.js';

class Home {
  constructor(id, data){
    const thisHome = this;

    thisHome.id = id;
    thisHome.data = data;

    thisHome.render();
    thisHome.initWidgets();

  }

  render(){
    const thisHome = this;

    /* generate HTML based on template */
    const generatedHTML = templates.homePage(thisHome.data);
    /* create element using utils.createElementFromHTML */
    thisHome.element = utils.createDOMFromHTML(generatedHTML);
    
    /* find menu container */
    const homeContainer = document.querySelector(select.containerOf.home);
    /* add element to menu */
    
    homeContainer.appendChild(thisHome.element);  
  }

  /* eslint-disable */ 
  initWidgets() {        
      GreenAudioPlayer.init({
        selector: '.player', // inits Green Audio Player on each audio container that has class "player"
        stopOthersOnPlay: true
    });   
  }
}

export default Home;