export const select = {
  containerOf: {    
    pages: '#pages',
    homePage: '.home-wrapper',
    searchPage: '.search-wrapper',
    discoverPage: '.discover-wrapper',
  },
  nav: {
    links: '.main-nav a',
  },
  player: {
    homeWrapper: '.players-home-wrapper',
    searchWrapper: '.players-search-wrapper',
    discoverWrapper: '.players-discover-wrapper',
    author_title: '.song-author-title',
    gap_plugin: '.player',
    description: '.player-description',
  },
  search: {
    input: '.search-input',
    searchResult: '.search-result',
  },
  button: {
    searchButton: '.btn-search'
  }
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',    
  },
  elements: {
    hidden: 'hide',
    homePageSongs: 'players-home-wrapper',
    searchPageSongs: 'players-search-wrapper',
    discoverPageSongs: 'players-discover-wrapper',
  },
  audioPlayer: {
    home: 'player-homepage',
    search: 'player-searchpage',
    discover: 'player-discoverpage',
  }
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    songs: 'songs',
  },
};

// export const templates = {
//   homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
//   searchPage: Handlebars.compile(document.querySelector(select.templateOf.searchPage).innerHTML),
//   discoverPage: Handlebars.compile(document.querySelector(select.templateOf.discoverPage).innerHTML),
// };