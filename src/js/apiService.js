const BASE_URL = 'https://pixabay.com/api/';
const apiKey = '21768835 - de3419a52772d349dcef7b4fc';
let page = 1;
function fetchImgs(seachQuery) {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${seachQuery}&page=${page}&per_page=12&key=${apiKey}`;
    fetch(url).then(response => {
        console.log('response :>> ', response);
        if (!response.ok) {
            alert('Bad Request');
        } else {
            return response.json();
        }
    })
} 