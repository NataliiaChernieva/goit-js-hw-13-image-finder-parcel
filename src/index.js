import './sass/main.scss';
import '../node_modules/material-design-icons';
import _debounce from '../node_modules/lodash.debounce';
import ApiService from './js/apiService';
import galleryItemTmp from './templates/galleryItemTmp.hbs';
import * as basicLightbox from '../node_modules/basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css'

const refs = {
    // searchForm: document.querySelector('.search-form'),
    inputEl: document.querySelector('.search-form-input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
};
const apiService = new ApiService();
console.log('apiService :>> ', apiService);

refs.inputEl.addEventListener('input', _debounce(onSearch, 1000));
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onGalleryImgClick);

function onSearch(e) {
    clearGallery();
    apiService.query = e.target.value;
    if (apiService.query && apiService.query !== '') {
        apiService.resetPage();
        apiService.fetchImgs().then(appendHitsMarckup);
        refs.loadMoreBtn.classList.remove('is-hidden');
    }
    // if (apiService.query === '') {'
    //     return alert('Bad Search Query');
    // }     
}

function onLoadMore() {
    apiService.fetchImgs().then(appendHitsMarckup).then(scroll);
    //scroll();
}

function appendHitsMarckup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend',galleryItemTmp(hits))
}

function clearGallery() {
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');
}

function scroll(){
    // refs.loadMoreBtn.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'end',
    // })
    const totalScrollHeight = refs.gallery.clientHeight + 80;
    console.log('totalScrollHeight :>> ', totalScrollHeight);
    window.scrollTo({
        top: totalScrollHeight,
        behavior: 'smooth',
    });
}

function onGalleryImgClick(e) {
    if (e.target.nodeName === 'IMG') {
        console.log('e.target :>> ', e.target);
        const instance = basicLightbox.create(`<img src=${e.target.dataset.source}>`);
        instance.show()
    }
}