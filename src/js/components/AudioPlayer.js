import utils from '../utils.js';

class AudioPlayer { // eslint-disable-line
  constructor(container, title, author, filename, categories, ranking, wrapperClass, audioPluginClass){
    const thisAudioPlayer = this;

    thisAudioPlayer.container = container;
    thisAudioPlayer.title = title;
    thisAudioPlayer.author = author;
    thisAudioPlayer.filename = filename;
    thisAudioPlayer.categories = categories;
    thisAudioPlayer.ranking = ranking;
    thisAudioPlayer.wrapperClass = wrapperClass;
    thisAudioPlayer.audioPluginClass = audioPluginClass;
    thisAudioPlayer.render();
  }

  render() {
    const thisAudioPlayer = this;

    let categoryList = '';
    const separator = ', ';
    for(let [i, category] of thisAudioPlayer.categories.entries()){
      if(i == 0){
        categoryList += category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() + separator;
      }
      if (i > 0 && i < thisAudioPlayer.categories.length - 1){
        categoryList += category.toLowerCase() + separator;
      }
      if (i == thisAudioPlayer.categories.length - 1){
        categoryList += category.toLowerCase();
      }
    }
    
    thisAudioPlayer.element = utils.createDOMFromHTML(`
    <div class="${thisAudioPlayer.wrapperClass} container">          
    <div class="row song-author-title">
      <h3 class="col-md-12">${thisAudioPlayer.author} - ${thisAudioPlayer.title}</h3>
    </div>  
    <div class="${thisAudioPlayer.audioPluginClass} player-global">
     <audio class="col-md-12 ">
       <source src="songs/${thisAudioPlayer.filename}" type="audio/mpeg">
     </audio>
   </div>
   <div class="row align-items-center player-description">
     <h4 class="col-md-6">Categories: ${categoryList} </h4>
     <h4 class="col-md-6 ranking"># ${thisAudioPlayer.ranking} in the ranking</h4>
   </div>              
  </div>`
    );

    thisAudioPlayer.container.appendChild(thisAudioPlayer.element);
  }
}

export default AudioPlayer;
