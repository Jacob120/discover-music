import {select, classNames, settings} from './settings.js';
import AudioPlayer from './components/AudioPlayer.js';
import utils from './utils.js';

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
        thisApp.initDiscover();
      });    
  },  

  initHome: function(){
    const thisApp = this;

    thisApp.generateDOMElement(select.containerOf.homePage, thisApp.data, classNames.elements.homePageSongs, classNames.audioPlayer.home);

    thisApp.playerWrapper = document.querySelectorAll(select.player.homeWrapper);  
    thisApp.categoryContainer = document.querySelector(select.containerOf.categoriesContainer);    
    thisApp.categoryFilter = document.querySelectorAll(select.filter.dataCategories);
    thisApp.audio = document.querySelectorAll(select.player.audio);
 
    /* Create list of links from categories */
    let allCategories = [];

    for(let data of thisApp.data){    

      for(let category of data.categories){    
     
        if(!allCategories.includes(category)){
          allCategories.push(category);
        } else {
          const idIndex = allCategories.indexOf(category);
          allCategories.splice(idIndex, 0);
        }     
      } 
    }

    for (let singleCategory of allCategories){
      thisApp.categoryElement = utils.createDOMListFromHTML(`<a href="#" link-category="${ singleCategory }"> ${ singleCategory } </a>`);
      thisApp.categoryContainer.appendChild(thisApp.categoryElement);
    }
    /* End of create list of links from categories */
    
    /* Filter songs by categories */
    thisApp.categoryContainer.addEventListener('click', function(e){
      e.preventDefault();
      
      const clickedElement = e.target;

      thisApp.playerWrapper = document.querySelectorAll(select.player.homeWrapper);
      thisApp.categoryLink = document.querySelectorAll(select.filter.linkCategory);         


      if(clickedElement != null){     

        for(let link of thisApp.categoryLink){ 

          if(link.classList.contains(classNames.elements.clicked)){         
            link.classList.remove(classNames.elements.clicked);
            for (let wrapper of thisApp.playerWrapper) {
              wrapper.classList.remove(classNames.elements.hidden);
            }          
          } else if(link.getAttribute('link-category').includes(clickedElement.getAttribute('link-category')) ){                
            link.classList.add(classNames.elements.clicked);

            for (let wrapper of thisApp.playerWrapper){
              wrapper.classList.remove(classNames.elements.hidden);

              const element = wrapper.querySelector(select.filter.dataCategories);        
           
              if(!element.getAttribute('data-categories').includes(clickedElement.getAttribute('link-category').toLowerCase())){
                wrapper.classList.add(classNames.elements.hidden);
              }      
            }
          } 
    
        }
      } 
    });
    /* End of filter */

    GreenAudioPlayer.init({ // eslint-disable-line no-undef
      selector: '.player-homepage', 
      stopOthersOnPlay: true
    });
  },

  initSearch: function(){
    const thisApp = this;

    thisApp.generateDOMElement(select.containerOf.searchPage, thisApp.data, classNames.elements.searchPageSongs, classNames.audioPlayer.search);

    thisApp.playerWrapper = document.querySelectorAll(select.player.searchWrapper);    
    thisApp.searchInput  = document.querySelector(select.search.input);  
    thisApp.searchButton = document.querySelector(select.button.searchButton);
    thisApp.searchResult = document.querySelector(select.search.searchResult);    
    thisApp.selectContainer = document.querySelector(select.containerOf.selectContainer);
    
    /* create list of categories and create select -> option */
    let allCategories = [];
    
    for(let data of thisApp.data){    

      for(let category of data.categories){    
     
        if(!allCategories.includes(category)){
          allCategories.push(category);
        } else {
          const idIndex = allCategories.indexOf(category);
          allCategories.splice(idIndex, 0);
        }     
      } 
    }

    for (let singleCategory of allCategories){
      thisApp.categoryElement = utils.createDOMOptionFromHTML(`${singleCategory}`);
      thisApp.selectContainer.appendChild(thisApp.categoryElement);
    }    
    /* End of create list of categories... */
   
    const arr = Array.from(thisApp.playerWrapper);  

    let result = [];   
    let optionValue = [];
    
    thisApp.selectContainer.addEventListener('click', function(e){
      e.preventDefault();
      const clickedElement = e.target.value;
      optionValue = [];
    
      optionValue.push(clickedElement);  
    });
    thisApp.searchResult.innerHTML = arr.length;    
    
    thisApp.searchButton.addEventListener('click', function(event){
      event.preventDefault();

      const value = thisApp.searchInput.value.toLowerCase();      
     
      arr.forEach((domElement) => {   
        const domCategories = domElement.querySelector('[data-categories]');
        let inputFilter = '';
        if(optionValue[0] == undefined){
          inputFilter = domElement.textContent.toLowerCase().includes(value);
        } else {
          inputFilter = domElement.textContent.toLowerCase().includes(value) && domCategories.textContent.toLowerCase().includes(optionValue[0].toLowerCase());
        }           

        if(inputFilter == true){
          domElement.classList.remove(classNames.elements.hidden);
          if(!result.includes(domElement)){
            result.push(domElement);
          }
        } else if(!inputFilter ){
          domElement.classList.add(classNames.elements.hidden);
          if(result.includes(domElement)){
            const idIndex = result.indexOf(domElement);
            result.splice(idIndex, 1);  
          }        
        }       
        thisApp.searchResult.innerHTML = result.length;
      });
    });

    GreenAudioPlayer.init({ // eslint-disable-line no-undef
      selector: '.player-searchpage', 
      stopOthersOnPlay: true
    });
  },

  initDiscover: function(){
    const thisApp = this;

    thisApp.generateDOMElement(select.containerOf.discoverPage, thisApp.data, classNames.elements.discoverPageSongs, classNames.audioPlayer.discover);

    thisApp.playerGlobal = document.querySelectorAll(select.player.playerGlobal);
    thisApp.playerWrapper = document.querySelectorAll(select.player.discoverWrapper);   
    thisApp.discoverPageId = document.getElementById('discover-nav-id');
    thisApp.discoverSubtitle = document.querySelector('.discover-subtitle');

    const arr = Array.from(thisApp.playerWrapper);
    const randomNumber = Math.floor(Math.random() * arr.length) +1; 

    thisApp.discoverSubtitle.innerHTML = `<h2>You didn&apos;t check any of our songs so we prepared something unpredictable!<br> Give it a try!</h2>`;

    const noFavoriteCategory = function(){
      arr.forEach((domElement) => {      
        domElement.classList.add(classNames.elements.hidden);   
        
        if(domElement.id == randomNumber) {
          domElement.classList.remove(classNames.elements.hidden);
        }
      });
    };
    noFavoriteCategory();

    let favoriteMusicCategories = {};

    for(let player of thisApp.playerGlobal){

      const playerAudio = player.querySelector('audio');
      const playerCategories = player.querySelector('[data-categories]');
      const playerCategoriesData = playerCategories.getAttribute('data-categories');
      const categoriesTagsArray = playerCategoriesData.split(' ');  

      playerAudio.addEventListener('play', function(e){
        e.preventDefault(); 
        
        for (let category of categoriesTagsArray) {
    
          if(!favoriteMusicCategories[category]){
            favoriteMusicCategories[category] = 1;
          } else {
            favoriteMusicCategories[category]++;
          }
        }
        const favoriteCategoriesList = Object.entries(favoriteMusicCategories).sort((a,b) => b[1]-a[1]).map(el=>el[0]); 
        thisApp.mostPopularCategory = favoriteCategoriesList[0];
      }); 
    }

    thisApp.discoverPageId.addEventListener('click', function(){
      arr.forEach((domElement) => {
          
        domElement.classList.add(classNames.elements.hidden);   
        
        const elementCategorySelector = domElement.querySelector('[data-categories]');
        const categoryOfElement = elementCategorySelector.getAttribute('data-categories');   
        if(thisApp.mostPopularCategory == undefined){
          noFavoriteCategory();
        }
        if(categoryOfElement.includes(thisApp.mostPopularCategory)){
          domElement.classList.remove(classNames.elements.hidden);
          const favCategory = thisApp.mostPopularCategory.toString();
          thisApp.discoverSubtitle.innerHTML = `<h2>We&apos;ve seen that you favorite category is "${favCategory}"!<br> We've prepared something special for you!</h2>`;
        } 
      });      
    });

    GreenAudioPlayer.init({ // eslint-disable-line no-undef
      selector: '.player-discoverpage', 
      stopOthersOnPlay: true
    });
  },

  generateDOMElement: function(container, data, wrapperClassName, audioPluginClass) {

    const elementContainer = document.querySelector(container);

    for(const item of data){
      new AudioPlayer(elementContainer, item.title, item.author, item.filename, item.categories, item.ranking, wrapperClassName, audioPluginClass, item.id);
    }
  },

  init: function () {
    const thisApp = this;
    thisApp.initPages();
  }
};

app.init();