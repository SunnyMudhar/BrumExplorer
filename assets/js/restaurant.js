var topTwentyBtn = document.getElementById('btnTwenty');
var randomBtn = document.getElementById('btnRandom');
var retrieveResultsBtn = document.getElementById('btnRetrieve');
var resultsCarousel = document.getElementById('carousel-results');
var carouselContainer = document.getElementById('carousel-container');
var randomResultsContainer = document.getElementById('random-result-container');
var loadingPrompt = document.getElementById('loading-text');

var numberOfCards    = 0;
var delay            = 5000;
var previousTask     = "";
var setActive        = false;
var restaurantObject = {};
var cardWrapper      = "";

topTwentyBtn.addEventListener('click', () => displayRestaurants("topTwenty"));
randomBtn.addEventListener('click', () => displayRestaurants("random"));
retrieveResultsBtn.addEventListener('click', () => displayRestaurants("retrieveResults"));

// Main function that controls which function to trigger based off of the button pressed
function displayRestaurants(filter) {

  resetCanvas();
  previousTask = filter;

  if (filter === "retrieveResults") {
    checkLocalStorage();
    delay = 0;
  } else {
    getAPIData();
    loadingPrompt.style.display = "flex";
  }

  // Delay function to display API data
  setTimeout( () => {
    switch (previousTask) {

      case "topTwenty":
        getTopTwenty();
        break;
  
      case "random":
        getRandom();
        break;
  
      default:
        console.error("Invalid Input for parm \"filter\"");
    }
    loadingPrompt.style.display = "none";
  }, delay)
}

function resetCanvas() {
  resultsCarousel.style.display = "none";
  loadingPrompt.style.display = "none";
  clearCards();
}

/*
*******************************
*         API SECTION         *
*******************************
*/

function getAPIData() {
  const url = 'https://restaurants222.p.rapidapi.com/search';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '5c43c68212msh2ed3338caf5ec95p174379jsn4c850fc9b80a',
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
      restaurantObject = data;
      saveData();
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

/*
*****************************************
*            LOCAL STORAGE              *
*****************************************
*/

function saveData() {
  console.log(`${previousTask} data saved`);
  localStorage.setItem("restaurantObject", JSON.stringify(restaurantObject));
  localStorage.setItem("previousTask", previousTask);
}

function checkLocalStorage() {
  if (!localStorage.getItem("previousTask")) createAlertModal("No previous search found!");
  restaurantObject = JSON.parse(localStorage.getItem("restaurantObject"));
  previousTask = localStorage.getItem("previousTask");
}

/*
**********************************************
*             PAGE FUNCTIONALITY             *
**********************************************
*/

function getTopTwenty() {

  resultsCarousel.style.display = "block";

  if (restaurantObject && restaurantObject.results && restaurantObject.results.data && Array.isArray(restaurantObject.results.data)) {
    // Create and append cards for each restaurant
    restaurantObject.results.data.forEach( restaurant => createCard(restaurant, "carousel"));
  } else {
    console.error('Data structure is not as expected:', restaurantObject);
  }
}

function getRandom() {

  randomResultsContainer.style.display = "block";

  if (restaurantObject.results) {    
    var rnd = Math.floor(Math.random() * restaurantObject.results.data.length)
    restaurantObject = restaurantObject.results.data[rnd];  // Overwrite local restaurant object with new random choice
    saveData();
  }
  
  // Display one card for random
  createCard(restaurantObject, "single");
}

/*
**********************************************
*         CREATE CARD FUNCTIONALITY          *
**********************************************
*/

function createCard(cardData, type) {

  if(type === "carousel") {

    if(numberOfCards === 0) {

      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
        
      if (!setActive) {
        carouselItem.classList.add('active');
        setActive = true;
      }
    
      carouselContainer.appendChild(carouselItem);
        
      cardWrapper = document.createElement('div');
      cardWrapper.classList.add('card-wrapper', 'row');
        
      carouselItem.appendChild(cardWrapper);
      numberOfCards = 4;  // Create 4 cards

    }

  } else {
           
    cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card-wrapper', 'row', 'card-single');
        
    randomResultsContainer.appendChild(cardWrapper);
    numberOfCards = 1;

  }

  numberOfCards--;

  const card = document.createElement('div');
  card.classList.add('card', 'm-3', 'card-results');

  const imageUrl = cardData.photo.images.small.url || 'https://via.placeholder.com/150';

  card.innerHTML = `
        <img src="${imageUrl}" class="card-img-top" alt="${cardData.name}">
        <div class="card-body">
          <h5 class="card-title">${cardData.name}</h5>
          <button type="button" class="btn btn-primary btn-rounded" data-bs-toggle="modal" data-bs-target="#${cardData.location_id}-modal">
            Description
          </button>
          <!-- Modal -->
          <div class="modal fade" id="${cardData.location_id}-modal" tabindex="-1" aria-labelledby="restaurantModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="restaurantModalLabel">${cardData.name} Description</h5>
                  <button type="button btn-rounded" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ${cardData.description}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary btn-rounded" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Rating: ${cardData.rating}</li>
          <li class="list-group-item">Cuisine: ${cardData.cuisine[0].name}</li>
          <li class="list-group-item">Address: ${cardData.address}</li>
        </ul>
        <div class="card-body">
          <a href="${cardData.website}" class="card-link" target="_blank">Visit Website</a>
        </div>
      `;

  cardWrapper.appendChild(card);
}

function clearCards() {
  carouselContainer.innerHTML = '';
  randomResultsContainer.innerHTML = '';
}