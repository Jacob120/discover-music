export const select = {
  templateOf: {
    homePage: '#template-home-page',
    searchPage: '#template-search-page',
    discoverPage: '#template-discover-page',
  },
  containerOf: {    
    pages: '#pages',
    home: '.home-wrapper',
    search: '.search-wrapper',
    discover: '.discover-wrapper',
  },
  nav: {
    links: '.main-nav a',
  }
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  }
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    songs: 'songs',
  },
};

export const templates = {
  homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
  searchPage: Handlebars.compile(document.querySelector(select.templateOf.searchPage).innerHTML),
  discoverPage: Handlebars.compile(document.querySelector(select.templateOf.discoverPage).innerHTML),
};