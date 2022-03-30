import {select, classNames, settings} from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';

const app = {
  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#', '');    

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
        window.location.hash = '#' + id;
      });
    }
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

  initPlayers: function(){
    const thisApp = this;

    for (let songData in thisApp.data.songs) {
      new  Home(thisApp.data.songs[songData].id, thisApp.data.songs[songData]);
      new  Search(thisApp.data.songs[songData].id, thisApp.data.songs[songData]);
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
        thisApp.data.songs = parsedResponse;

        thisApp.initPlayers();
      });    
  },

  // initHome(){
  //   const thisApp = this;

  //   const homeElement = document.querySelector(select.containerOf.home);

  //   thisApp.home = new Home(homeElement);
  // },

  initSearch(){
    const thisApp = this;

    const searchElement = document.querySelector(select.containerOf.search);

    thisApp.search = new Search(searchElement);
   
  },

  initDiscover(){
    const thisApp = this;

    const discoverElement = document.querySelector(select.containerOf.discover);

    thisApp.discover = new Discover(discoverElement);
  },

  init: function () {
    const thisApp = this;

    thisApp.initPages();
    thisApp.initData();
    // thisApp.initHome();
    thisApp.initSearch();
    thisApp.initDiscover();

  

  }
};

app.init();