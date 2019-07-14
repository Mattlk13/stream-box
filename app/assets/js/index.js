/* eslint-env browser */

/* global searchMedia */

const imageCache = require('image-cache');

// Misc globals
const LOADER = document.getElementById('loader');
let CURRENT_LOADED_PAGE = 'home-page';

// Navigation globals
const NAV_ALL = document.querySelectorAll('[data-navigation]');

// Movie Details page globals
const MOVIE_DETAILS_PAGE = document.getElementById('movie-details-page');
const MOVIE_DETAILS_PAGE_WATCH_NOW = document.getElementById('watch-now');
const MOVIE_DETAILS_PAGE_BACKDROP = MOVIE_DETAILS_PAGE.querySelector('.header .wrapper .backdrop');
const MOVIE_DETAILS_PAGE_TITLE = MOVIE_DETAILS_PAGE.querySelector('.header .wrapper .metadata .title');
const MOVIE_DETAILS_PAGE_AGE_RATING = MOVIE_DETAILS_PAGE.querySelector('.header .wrapper .metadata .details .age-rating');
const MOVIE_DETAILS_PAGE_RUNTIME = MOVIE_DETAILS_PAGE.querySelector('.header .wrapper .metadata .details .runtime');
const MOVIE_DETAILS_PAGE_GENRES = MOVIE_DETAILS_PAGE.querySelector('.header .wrapper .metadata .details .genres');
const MOVIE_DETAILS_PAGE_RELEASE_YEAR = MOVIE_DETAILS_PAGE.querySelector('.header .wrapper .metadata .details .release-year');
const MOVIE_DETAILS_PAGE_POSTER = MOVIE_DETAILS_PAGE.querySelector('.content img.poster');
const MOVIE_DETAILS_PAGE_SYNOPSIS = MOVIE_DETAILS_PAGE.querySelector('.content .information .synopsis .body');
const MOVIE_DETAILS_PAGE_CAST = MOVIE_DETAILS_PAGE.querySelector('.content .information .cast .body');
const MOVIE_DETAILS_PAGE_VIDEOS = MOVIE_DETAILS_PAGE.querySelector('.content .other-media .videos .body');
const MOVIE_DETAILS_PAGE_RELATED = MOVIE_DETAILS_PAGE.querySelector('.content .other-media .related .body');

// Home page globals
const HOME_CAROUSEL_LIST = document.querySelector('#home-page .carousel');
const HOME_MOVIE_LIST = document.querySelector('#home-page-popular-movies .body');
const HOME_TVSHOW_LIST = document.querySelector('#home-page-popular-tvshows .body');

// Search page globals
const SEARCH_PAGE = document.getElementById('search-page');
const SEARCH_PAGE_SEARCH_INPUT= SEARCH_PAGE.querySelector('#search-input');
const SEARCH_PAGE_SEARCH_QUERY = SEARCH_PAGE.querySelector('.query');
const SEARCH_PAGE_MEDIA_LIST = SEARCH_PAGE.querySelector('.list');

function addEvent(object, event, func) {
	object.addEventListener(event, func, true);
}

function cachedImageUrl(url) {
	if (imageCache.isCachedSync(url)) {
		const cachedPosterSrc = imageCache.getCacheSync(url);
		return cachedPosterSrc.data;
	} else {
		// image-cache doesn't have a sync version of this method
		imageCache.setCache(url, () => {});
	}

	return url;
}

function loadPage(id) {
	hideOverlays();

	const currentActivePage = document.querySelector('.page.active');
	if (currentActivePage) {
		currentActivePage.classList.remove('active');
	}

	const selectedNavigation = document.querySelector('.navigation-item.selected');
	if (!selectedNavigation || id !== selectedNavigation.dataset.navigation) {
		if (selectedNavigation) {
			selectedNavigation.classList.remove('selected');
		}
	
		const newSelecedtNav = document.querySelector(`[data-navigation="${id}"]`);
		if (newSelecedtNav) {
			newSelecedtNav.classList.add('selected');
		}
	}

	CURRENT_LOADED_PAGE = id;
	document.getElementById(id).classList.add('active');
}

function loadHomePage() {
	loadPage('home-page');
}

function loadMovieDetailsPage() {
	loadPage('movie-details-page');
}

function showOverlay(id) {
	hideOverlays();

	document.getElementById(id).classList.add('active');
}

function hideOverlays() {
	const currentActiveOverlay = document.querySelector('.overlay.active');
	if (currentActiveOverlay) {
		currentActiveOverlay.classList.remove('active');
	}
}

function hideLoader() {
	LOADER.classList.add('hide');
}

function showLoader() {
	LOADER.classList.remove('hide');
}

function disallowBodyScroll() {
	document.body.classList.add('noscroll');
}

function allowBodyScroll() {
	document.body.classList.remove('noscroll');
}


const toggle = document.getElementsByClassName('stream-site');

for (let i = 0; i < toggle.length; i++) {
	toggle[i].addEventListener('click', function() {
		const content = this.querySelector('.streams');
		if (content.style.maxHeight) {
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + 'px';
		} 
	});
}

// Get around eslint no-unused-vars, and make 100% sure the variables are global
!function() {
	this.CURRENT_LOADED_PAGE = CURRENT_LOADED_PAGE;
	this.MOVIE_DETAILS_PAGE_WATCH_NOW = MOVIE_DETAILS_PAGE_WATCH_NOW;
	this.MOVIE_DETAILS_PAGE_BACKDROP = MOVIE_DETAILS_PAGE_BACKDROP;
	this.MOVIE_DETAILS_PAGE_TITLE = MOVIE_DETAILS_PAGE_TITLE;
	this.MOVIE_DETAILS_PAGE_AGE_RATING = MOVIE_DETAILS_PAGE_AGE_RATING;
	this.MOVIE_DETAILS_PAGE_RUNTIME = MOVIE_DETAILS_PAGE_RUNTIME;
	this.MOVIE_DETAILS_PAGE_GENRES = MOVIE_DETAILS_PAGE_GENRES;
	this.MOVIE_DETAILS_PAGE_RELEASE_YEAR = MOVIE_DETAILS_PAGE_RELEASE_YEAR;
	this.MOVIE_DETAILS_PAGE_POSTER = MOVIE_DETAILS_PAGE_POSTER;
	this.MOVIE_DETAILS_PAGE_SYNOPSIS = MOVIE_DETAILS_PAGE_SYNOPSIS;
	this.MOVIE_DETAILS_PAGE_CAST = MOVIE_DETAILS_PAGE_CAST;
	this.MOVIE_DETAILS_PAGE_VIDEOS = MOVIE_DETAILS_PAGE_VIDEOS;
	this.MOVIE_DETAILS_PAGE_RELATED = MOVIE_DETAILS_PAGE_RELATED;
	this.HOME_CAROUSEL_LIST = HOME_CAROUSEL_LIST;
	this.HOME_MOVIE_LIST = HOME_MOVIE_LIST;
	this.HOME_TVSHOW_LIST = HOME_TVSHOW_LIST;
	this.SEARCH_PAGE_SEARCH_INPUT = SEARCH_PAGE_SEARCH_INPUT;
	this.SEARCH_PAGE_MEDIA_LIST = SEARCH_PAGE_MEDIA_LIST;
	this.SEARCH_PAGE_SEARCH_QUERY = SEARCH_PAGE_SEARCH_QUERY;

	this.cachedImageUrl = cachedImageUrl;
	this.loadPage = loadPage;
	this.loadHomePage = loadHomePage;
	this.loadMovieDetailsPage = loadMovieDetailsPage;
	this.hideLoader = hideLoader;
	this.showLoader = showLoader;
	this.disallowBodyScroll = disallowBodyScroll;
	this.allowBodyScroll = allowBodyScroll;

	NAV_ALL.forEach(element => {
		addEvent(element, 'click', () => {
			const selectedPage = document.querySelector('.page.active');
			const selectedNavigation = document.querySelector('.navigation-item.selected');
	
			if (selectedPage.id === element.dataset.navigation) {
				return;
			}
	
			if (selectedNavigation) {
				selectedNavigation.classList.remove('selected');
			}

			element.classList.add('selected');
			loadPage(element.dataset.navigation);
		});
	});

	document.querySelectorAll('[data-overlay]').forEach(element => {
		addEvent(element, 'click', () => {
			const currentActiveOverlay = document.querySelector('.page.active');
	
			if (currentActiveOverlay.id === element.dataset.overlay) {
				return;
			}
	
			showOverlay(element.dataset.overlay);
		});
	});
}();