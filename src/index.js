import './sass/main.scss';
import '../node_modules/material-design-icons';
import _debounce from '../node_modules/lodash.debounce';
import API from './js/apiService';
import galleryTmp from './templates/galleryTmp.hbs';
import imgCardTmp from './templates/imgCardTmp.hbs';

const refs = {
    searchForm: document.getElementById('#search-form'),
    gallerySection: document.querySelector('.gallery-section'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
}
refs.searchForm.addEventListener('input', _debounce((e) => {
    const seachQuery = e.currentTarget.elements.query.value;
    console.log('seachQuery :>> ', seachQuery);
    API.fetchImgs(seachQuery).then(renderGallery).catch(onFetchError)
}, 500));
    
function renderGallery(data) {
    console.log('data :>> ', data);
    const markup = imgCardTmp(data);
    
}

function onFetchError(){}