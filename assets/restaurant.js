// Function to fetch and display restaurant data
function displayRestaurants() {
  const url = 'https://restaurants222.p.rapidapi.com/search';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'aac169de3dmsha6ebec7d2564ea7p1ba5ecjsn7ae8ce60b0ab',
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
      // Logged the data to the console to inspect its structure
      console.log('Response data:', data);

      // specified where i want the data to be appended 
      const restaurantCardsContainer = document.getElementById('restaurantCards');

      if (data && data.results && data.results.data && Array.isArray(data.results.data)) {
        // Create and append cards for each restaurant
        data.results.data.forEach(restaurant => {
          const card = document.createElement('div');
          card.classList.add('card', 'm-3');
          card.style = 'width: 18rem;';

         
          const imageUrl = restaurant.image_url || 'https://via.placeholder.com/150';

          card.innerHTML = `
            <img src="${restaurant.photo.images.small.url}" class="card-img-top" alt="${restaurant.name}">
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

          restaurantCardsContainer.appendChild(card);
        });
      } else {
        console.error('Data structure is not as expected:', data);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

// Event listener for loading the restaurants when the page is loaded
document.addEventListener('DOMContentLoaded', displayRestaurants);
