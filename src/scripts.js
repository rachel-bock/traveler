import './css/styles.css';
import {
  promise
} from './apiCalls';
import Travelers from './Travelers';
import Destinations from './Destinations';
import Trips from './Trips';

import './images/map-banner.png';
import './images/mapBanner.png';

let cardWrapper = document.querySelector(`.card-wrapper`);
let totalSpent = document.querySelector('.total-spent');
let newTripDate = document.getElementById('trip-date');
let newTripDuration = document.getElementById('trip-duration');
let newTripTravelers = document.getElementById('trip-travelers');
let newTripDestination = document.getElementById('trip-destination');
let newTripSaveButton = document.getElementById('add-new-trip-button');
let travelerGreeting = document.querySelector('.traveler-name');

let destinations;
let travelers;
let individual = {};
let trips;

const getRandomID = () => {
  return Math.floor(Math.random() * 50);
};

const travelerID = getRandomID();

newTripDate.addEventListener('keyup', checkNewTripFormFields);
newTripTravelers.addEventListener('keyup', checkNewTripFormFields);
newTripDuration.addEventListener('keyup', checkNewTripFormFields);
newTripDestination.addEventListener('click', checkNewTripFormFields);
newTripSaveButton.addEventListener('click', () => { 
  console.log('What goes here?')
});

function checkNewTripFormFields () {
  if (newTripDate.value !== '' && newTripDuration.value !== '' && 
    newTripDestination.value !== '' && newTripTravelers.value !== '') {
    newTripSaveButton.classList.remove('disable');
    newTripSaveButton.disabled = false;
  } else {
    newTripSaveButton.classList.add('disable');
    newTripSaveButton.disabled = true;
  }
}

const totalSpentByYear = () => {
  let spent = 0;
  individual.trips.forEach(trip => {
    let myDate = new Date(trip.date);
    if (myDate.getFullYear() === "2022") {
      spent += destinations.calculateTripCost(trip.destinationID, trip.travelers, trip.duration);
    }
  });
  totalSpent.innerText = spent.toFixed(2);
};

const populateDestinationsDropdown = () => {
  // <option value="volvo">Volvo</option>
  // destinations.destinations.sort((a, b) => {
  //   return a.destination.localeCompare(b);
  // });
  destinations.destinations.forEach(spot => {
    newTripDestination.innerHTML += `<option 
      value='${spot.destination}'>
        ${spot.destination}
      </option>`
  });
};

const getData = () => {
  promise.then(data => {
    travelers = new Travelers(data[0]);
    trips = new Trips(data[1]);
    destinations = new Destinations(data[2]);
    console.log(travelerID);
    individual.travelerID = travelerID;
    individual.name = travelers.travelers.find(traveler => travelerID === traveler.id).name;
    travelerGreeting.innerText = individual.name;
    individual.trips = trips.returnSingleUserTrips(travelerID);    
    individual.trips.map(vacation => {
      vacation.destination = destinations.destinations.find(destination => destination.id === vacation.destinationID);
    });

    populateDestinationsDropdown();
    displayTrips();
    totalSpentByYear();
  });
};

getData();

const displayTrips = () => {
  individual.trips.sort((a,b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateB - dateA;
  });
  console.log(individual.trips);
  individual.trips.forEach(trip => {
    cardWrapper.innerHTML += `
    <div class="trip-card">
      <div class="card-img">
        <img src='${trip.destination.image}' alt='${trip.destination.alt}' />
        <span class="trip-heading hidden">
          <h4>Adventure Pending<h4></span>
      </div>
      <div class="card-info">
        Destination: <br>
        <h2>
          <span class="card-destination">${trip.destination.destination}
          </span>
        </h2>
        <br>
        People Traveling: 
        <div class="people-traveling">
          <h4>${trip.travelers}</h4>
        </div> <!-- closes people-traveling -->
        <br>
        Travel Beginning On: <br>
        <h4>${trip.date}</h4>
        <br>
        Travel Duration: <br>
        <div class="travel-duration">
          <h4>${trip.duration} days</h4>
        </div> <!-- closes travel-duration -->
        <br>
        <div class="costs">
          <strong>TOTAL COSTS: $
            <span class="total-cost">
              ${(destinations.calculateTripCost(trip.destinationID, trip.travelers, trip.duration)).toFixed(2)}
            </span>
          </strong>
          <br>
          Lodging: 
            $<span class="lodging-cost">
              ${(destinations.calculateLodgingCost(trip.destinationID, trip.duration)).toFixed(2)}
            </span><br>
          Flights: 
            $<span class="flights-cost">
              ${(destinations.calculateFlightCostPerPerson(trip.destinationID, trip.travelers)).toFixed(2)}
          </span><br>
        </div>
      </div> <!-- closes card-info -->
    </div><!-- closes class="card add-new-trip"   -->`    
  });
  
};

