/* eslint-disable indent */
/* eslint-disable max-len */
import './css/styles.css';
import {
  fetchToAddTrip,
  promise
} from './apiCalls';
import Destinations from './Destinations';
import Travelers from './Travelers';
import Trips from './Trips';
import './images/map-banner2.png';

let destinations;
let individual = {};
// let today;
let travelers;
let trips;

const checkLoginFormFields = () => {
  if (userName.value !== '' && password.value !== '' ) {
    loginButton.classList.remove('disable');
    loginButton.disabled = false;
  } else {
    loginButton.classList.add('disable');
    loginButton.disabled = true;
  }
};

 const checkNewTripFormFields =  () => {
  if (newTripDate.value !== '' && newTripDuration.value !== '' && 
    newTripDestination.value !== '' && newTripTravelers.value !== '') {
    newTripSaveButton.classList.remove('disable');
    newTripSaveButton.disabled = false;
    updateEstimatedCosts();
    newCosts.classList.remove("hidden");
  } else {
    newTripSaveButton.classList.add('disable');
    newTripSaveButton.disabled = true;
  }
};

const clearNewTripForm = () => {
  newTripDate.value = "";
  newTripDestination.value = 1;
  newTripDuration.value = "";
  newTripTravelers.value = "";
};

const createPOSTDataPackage = () => {
  let output = {};
  // console.log("Date: ", newTripDate.value);
  // console.log("Destination: " , newTripDestination.value);
  // console.log("Duration: ", newTripDuration.value);
  // console.log("Travelers: ", newTripTravelers.value);
  // console.log("TravelerID: ", travelerID);

  let myDate = newTripDate.value.split("-");
  myDate = myDate.join('/');

  output.id = Date.now();
  output.userID = travelerID;
  output.destinationID = parseInt(newTripDestination.value);
  output.travelers = parseInt(newTripTravelers.value);
  output.date = myDate;
  output.duration = parseInt(newTripDuration.value);
  output.status = 'pending';
  output.suggestedActivities = [];
  // console.log(output);
  return output;
};

const displayTrips = (tripList) => {
  tripList.trips.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateB - dateA;
  });

  tripList.trips.forEach(trip => {
    cardWrapper.innerHTML += `
    <div class="trip-card">
      <div class="card-img">
        <img src='${trip.destination.image}' alt='${trip.destination.alt}' />
        <span class="trip-heading">
          <h3>Adventure ${trip.status}<h3></span>
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
              ${(destinations.calculateTripCost(
                trip.destinationID, trip.travelers, trip.duration)).toFixed(2)}
            </span>
          </strong>
          <br>
          Lodging: 
            $<span class="lodging-cost">
              ${(destinations.calculateLodgingCost(
                trip.destinationID, trip.duration)).toFixed(2)}
            </span><br>
          Flights: 
            $<span class="flights-cost">
              ${(destinations.calculateFlightCostPerPerson(
                trip.destinationID, trip.travelers)).toFixed(2)}
          </span><br>
        </div>
      </div> <!-- closes card-info -->
    </div><!-- closes class="card add-new-trip"   -->`    
  });  
};

const getData = () => {
  promise.then(data => {
    travelers = new Travelers(data[0]);
    trips = new Trips(data[1]);
    destinations = new Destinations(data[2]);
    individual.travelerID = parseInt(travelerID);
    individual.name = travelers.travelers.find(traveler => individual.travelerID === traveler.id).name;
    travelerGreeting.innerText = `Welcome ${individual.name}!`;
    individual.trips = trips.returnSingleUserTrips(individual.travelerID);    
    individual.trips.map(vacation => {
      vacation.destination = destinations.destinations.find(destination => destination.id === vacation.destinationID);
    });

    populateDestinationsDropdown();
    displayTrips(individual);
    totalSpentByYear();
  });
};

// const getRandomID = () => {
//   return Math.floor(Math.random() * 50);
// };


const limitCalendarMinDate = () => {
  let date = new Date();
  let myMonth;
  if ((date.getMonth() + 1) < 10) {
    myMonth = '0' + (date.getMonth() + 1);
  } else {
    myMonth = (date.getMonth() + 1);
  }
  let today = `${date.getFullYear()}-${myMonth}-${date.getDate()}`;
  
  newTripDate.setAttribute("min", today);
};


const populateDestinationsDropdown = () => {
  // <option value="volvo">Volvo</option>
  newTripDestination.innerHTML = '';
  destinations.destinations.sort((a, b) => {
    return a.destination.localeCompare(b.destination);
  });
  destinations.destinations.forEach(spot => {
    newTripDestination.innerHTML += `<option 
      value='${spot.id}'>
        ${spot.destination}
      </option>`
  });
};

const prepareSampleTripsView = () => {
  promise.then(data => {
    let samples = {
      "trips": [{
      "id": 1,
      "userID": 44,
      "destinationID": 13,
      "destination": {
        "id": 13,
        "destination": "St. Petersburg, Russia",
        "estimatedLodgingCostPerDay": 100,
        "estimatedFlightCostPerPerson": 1100,
        "image": "https://images.unsplash.com/photo-1556543697-2fb00d31948a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "buildings and people crossing the street carrying shoping bags during the day"
      },
      "travelers": 1,
      "date": "2022/09/16",
      "duration": 8,
      "status": "pending",
      "suggestedActivities": []
    },
    {
      "id": 2,
      "userID": 35,
      "destinationID": 25,
      "destination": {
        "id": 25,
        "destination": "New York, New York",
        "estimatedLodgingCostPerDay": 175,
        "estimatedFlightCostPerPerson": 200,
        "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
      },
      "travelers": 5,
      "date": "2022/10/04",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
    },
    {
      "id": 3,
      "userID": 3,
      "destinationID": 22,
      "destination": {
        "id": 22,
        "destination": "Rome, Italy",
        "estimatedLodgingCostPerDay": 90,
        "estimatedFlightCostPerPerson": 650,
        "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "people standing inside a colosseum during the day"
      },
      "travelers": 4,
      "date": "2022/05/22",
      "duration": 17,
      "status": "pending",
      "suggestedActivities": []
    },
    {
      "id": 4,
      "userID": 43,
      "destinationID": 14,
      "destination": {
        "id": 14,
        "destination": "Marrakesh, Morocco",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 830,
        "image": "https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
        "alt": "people buying oranges and other fruit from a street vendor"
      },
      "travelers": 2,
      "date": "2022/02/25",
      "duration": 10,
      "status": "pending",
      "suggestedActivities": []
    },
    {
      "id": 5,
      "userID": 42,
      "destinationID": 29,
      "destination": {
        "id": 29,
        "destination": "Willemstad, Curaçao",
        "estimatedLodgingCostPerDay": 80,
        "estimatedFlightCostPerPerson": 1100,
        "image": "https://images.unsplash.com/photo-1541748603027-cbfefa3a6c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80",
        "alt": "brightly colored buildings near body of water"
      },
      "travelers": 3,
      "date": "2022/04/30",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
    },
    {
      "id": 6,
      "userID": 29,
      "destinationID": 8,
      "destination": {
        "id": 8,
        "destination": "Tokyo, Japan",
        "estimatedLodgingCostPerDay": 125,
        "estimatedFlightCostPerPerson": 1000,
        "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
        "alt": "city with people walking in crosswalk and brightly lit shops at night"
      },
      "travelers": 3,
      "date": "2022/06/29",
      "duration": 9,
      "status": "pending",
      "suggestedActivities": []
    }]};
    destinations = new Destinations(data[2]);
    cardWrapper.classList.remove('hidden');
    displayTrips(samples);
  });
};

const processNewTripFormClick = () => {
  event.preventDefault();

  let newTripDetails = createPOSTDataPackage();
  fetchToAddTrip(newTripDetails);
  clearNewTripForm();

  newTripDetails.destination = destinations.destinations.find(destination => destination.id === newTripDetails.destinationID);
  individual.trips.unshift(newTripDetails);
  cardWrapper.innerHTML = "";
  displayTrips(individual);
  totalSpentByYear();
  newTotalCost.innerText = "";
  newTripSaveButton.classList.add('disable');
  newTripSaveButton.disabled = true;    
  newCosts.classList.add("hidden");
};

const processTravelerLogin = () => {
  event.preventDefault();
  
  if (userName.value.length === 10 && userName.value.includes('traveler') && password.value === 'travel') {
    travelerID = userName.value.substring(8, 10);
    loginForm.classList.add('hidden');
    addNewTripForm.classList.remove("hidden");
    spentStatement.classList.remove("hidden");
    cardWrapper.innerHTML = '';
    getData();  
  } else {
    userName.value = "";
    password.value = "";
    alert("User login not recognized.  Please contact your agent for help.");
  } 
 };

const totalSpentByYear = () => {
  let spent = 0;
  individual.trips.forEach(trip => {
    let myDate = new Date(trip.date);
    if (myDate.getFullYear() === 2022) {
      spent += destinations.calculateTripCost(
        trip.destinationID, trip.travelers, trip.duration);
    }
  });
  totalSpent.innerText = spent.toFixed(2);
};

// const travelerID = getRandomID();
let travelerID;

const updateEstimatedCosts = () => {
  newTotalCost.innerText =  destinations.calculateTripCost(newTripDestination.value, newTripTravelers.value, newTripDuration.value).toFixed(2);
};

let cardWrapper = document.querySelector('.card-wrapper');
let totalSpent = document.querySelector('.total-spent');
let newTripDate = document.getElementById('trip-date');
let newTripDuration = document.getElementById('trip-duration');
let newTripTravelers = document.querySelector('.trip-travelers');
let newTripDestination = document.getElementById('trip-destination');
let newTripSaveButton = document.getElementById('add-new-trip-button');
let travelerGreeting = document.querySelector('.traveler-greeting');
let newTotalCost = document.querySelector('.new-total-cost');
let newCosts = document.querySelector('.costs');
let userName = document.querySelector('.user-name');
let password = document.querySelector('.password');
let loginButton = document.querySelector('#login-button');
let loginForm = document.querySelector('.login');
let addNewTripForm = document.querySelector('.add-new-trip');
let spentStatement = document.querySelector('.spent');

newTripDate.addEventListener('keyup', checkNewTripFormFields);
newTripTravelers.addEventListener('keyup', checkNewTripFormFields);
newTripDuration.addEventListener('keyup', checkNewTripFormFields);
newTripDestination.addEventListener('input', checkNewTripFormFields);     
newTripSaveButton.addEventListener('click', processNewTripFormClick);
// trip duration <= 0, form fields invalid entries
// departure dates in the past, # travelers 0 or less
// No valid destination.
// data validations?  POST fetch requests.
userName.addEventListener('keyup', checkLoginFormFields);
password.addEventListener('keyup', checkLoginFormFields);
loginButton.addEventListener('click', processTravelerLogin);

prepareSampleTripsView();
limitCalendarMinDate();