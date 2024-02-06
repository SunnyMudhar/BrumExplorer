var topTwentyBtn = document.getElementById('btnTwenty');
var randomBtn = document.getElementById('btnRandom');
var resultsCarousel = document.getElementById('carousel-results');

var i = 0;
var setActive = false;
var restaurantObject = {};
var delay = 3000;

topTwentyBtn.addEventListener('click', () => displayRestaurants("topTwenty"));
randomBtn.addEventListener('click', () => displayRestaurants("random"));

// Function to fetch and display restaurant data
function displayRestaurants(filter) {

  checkLocalStorage();

  // Delay
  setTimeout( () => {
    if (filter === "topTwenty") {
      getTopTwenty();
    } else if (filter === "random") {
      getRandom();
    }
  }, delay)

}

function getData() {
  const url = 'https://restaurants222.p.rapidapi.com/search';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '67d23fb0b5mshea67329f6a1d2c2p1c807ejsncdbdea6529d3',
      'X-RapidAPI-Host': 'restaurants222.p.rapidapi.com'
    },
    body: new URLSearchParams({
      location_id: '186402',
      language: 'en_UK',
      currency: 'GBP',
      offset: '0'
    })
  };

  fetch(url, options)
    .then(response => {
      // checked to make sure there is a promise
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // converted the result to json
      return response.json();
    })
    .then(data => {
      // Save data to local storage for use in other functions and to save API calls
      restaurantObject = data;
      saveData();
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

function saveData() {
  localStorage.setItem("restaurantObject", JSON.stringify(restaurantObject));
}

function checkLocalStorage() {
  if (!JSON.parse(localStorage.getItem("restaurantObject"))) getData();
  delay = 0;
  restaurantObject = JSON.parse(localStorage.getItem("restaurantObject"));
}

function getTopTwenty() {

  resultsCarousel.style.display = "block";

  console.log('Response data:', restaurantObject);

  // specified where i want the data to be appended 
  const carouselContainer = document.getElementById('carousel-container');
  var cardWrapper = "";

  if (restaurantObject && restaurantObject.results && restaurantObject.results.data && Array.isArray(restaurantObject.results.data)) {
    // Create and append cards for each restaurant
    restaurantObject.results.data.forEach(restaurant => {

      if(i === 0) {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
          
        if (!setActive) {
          carouselItem.classList.add('active');
          setActive = true;
        }
          
        carouselContainer.appendChild(carouselItem);
          
        cardWrapper = document.createElement('div');
        cardWrapper.classList.add('card-wrapper');
          
        carouselItem.appendChild(cardWrapper);
        i = 5;  // Create 5 cards
      }

      i--;

      const card = document.createElement('div');
      card.classList.add('card', 'm-3', 'card-results');
   
      const imageUrl = restaurant.photo.images.small.url || 'https://via.placeholder.com/150';

      card.innerHTML = `
            <img src="${imageUrl}" class="card-img-top" alt="${restaurant.name}">
            <div class="card-body">
              <h5 class="card-title">${restaurant.name}</h5>
              <p class="card-text">${restaurant.description}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Rating: ${restaurant.rating}</li>
              <li class="list-group-item">Cuisine: ${restaurant.cuisine[0].name}</li>
              <li class="list-group-item">Address: ${restaurant.address}</li>
            </ul>
            <div class="card-body">
              <a href="${restaurant.website}" class="card-link" target="_blank">Visit Website</a>
            </div>
          `;

      cardWrapper.appendChild(card);
    });
  } else {
    console.error('Data structure is not as expected:', restaurantObject);
  }
}

function getRandom() {
  var rnd = Math.floor(Math.random() * restaurantObject.results.data.length)
  //display one card for random
}