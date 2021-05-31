const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21768835-de3419a52772d349dcef7b4fc';

export default class ApiService {
    constructor() {
        this.seachQuery = '';
        this.page = 1;
    }

    fetchImgs() {
        console.log('this :>> ', this);
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.seachQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
            return fetch(url).then(response => {
            console.log('response :>> ', response);
            if (!response.ok) {
                alert('Bad Request');
                return;
            } else {
                return response.json();
            }
        }).then(data => {
            console.log('data :>> ', data);
            this.incrementPage();
            return data.hits;
        })
    }
    
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.seachQuery;
    }

    set query(newQuery) {
        this.seachQuery = newQuery;
    }
}