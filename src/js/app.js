import {select, classNames, settings} from './settings.js';
import AudioPlayer from './components/AudioPlayer.js';

const app = {
  initPages: function(){
    const thisApp = this;

    
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');    

    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();
        
        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');
        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);
        
        /* change URL hash */
        window.location.hash = '#/' + id;

        
      });
    }

    thisApp.initData();

    
  },

  activatePage: function(pageId){
    const thisApp = this;

    /* add class "active"  to matching pages, remove from non-matching */
    for(let page of thisApp.pages){  
      page.classList.toggle(classNames.pages.active, page.id == pageId); 
    }

    /* add class "active"  to matching links, remove from non-matching */
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },
  
  initData: function(){
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.songs;
    
    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data = parsedResponse;
        thisApp.initHome();
        thisApp.initSearch();
      });    
  },  

  initHome: function(){
    const thisApp = this;

    thisApp.generateDOMElement(select.containerOf.homePage, thisApp.data, classNames.elements.homePageSongs, classNames.audioPlayer.home);

    GreenAudioPlayer.init({ // eslint-disable-line no-undef
      selector: '.player-homepage', 
      stopOthersOnPlay: true
    });
  },

  initSearch: function(){
    const thisApp = this;


    const playerWrapper = document.querySelector('.search-wrapper');
    const test = document.querySelector('.players-search-wrapper');
    // const searchInput  = document.querySelector(select.search.input);  
    // const searchButton = document.querySelector(select.button.searchButton);
    // const searchResult = document.querySelector(select.search.searchResult);

    console.log('wrapper', playerWrapper);
    console.log('test', test);
    // const arr = Array.from(playerWrapper);  
 
    // let result = [];   
    
    // searchResult.innerHTML = arr.length;    

    // searchButton.addEventListener('click', function(event){
    //   event.preventDefault();

    //   const value = searchInput.value.toLowerCase();
      
    //   arr.forEach((domElement) => {        
   
    //     const isVisible = domElement.textContent.toLowerCase().includes(value);
      
    //     if(isVisible == true){
    //       domElement.classList.remove(classNames.elements.hidden);
    //       if(!result.includes(domElement)){
    //         result.push(domElement);
    //       }
    //     } else if(!isVisible){
    //       domElement.classList.add(classNames.elements.hidden);
    //       if(result.includes(domElement)){
    //         const idIndex = result.indexOf(domElement);
    //         result.splice(idIndex, 1);  
    //       }        
    //     }    
       
    //     searchResult.innerHTML = result.length;
    //   });
    // }); 

    thisApp.generateDOMElement(select.containerOf.searchPage, thisApp.data, classNames.elements.searchPageSongs, classNames.audioPlayer.search);

    GreenAudioPlayer.init({ // eslint-disable-line no-undef
      selector: '.player-searchpage', 
      stopOthersOnPlay: true
    });
  },

  generateDOMElement: function(container, data, wrapperClassName, audioPluginClass) {
    // const thisApp = this;
    const elementContainer = document.querySelector(container);

    for(const item of data){
      new AudioPlayer(elementContainer, item.title, item.author, item.filename, item.categories, item.ranking, wrapperClassName, audioPluginClass);
    }
  },

  init: function () {
    const thisApp = this;

    thisApp.initPages();    
    
  }
};

app.init();