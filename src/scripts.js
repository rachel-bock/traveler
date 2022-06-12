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

let destinations;
let travelers;
let individual;
let trips;

const getRandomID = () => {
  return Math.floor(Math.random() * 50);
};

const travelerID = getRandomID();

const getData = () => {
  promise.then(data => {
    travelers = data[0];
    trips = data[1];
    destinations = data[2];
    console.log(data);
    individual.trips = trips.filter(trip => trip.userID === travelerID);
    displayTrips();
  });
};

getData();

const displayTrips = () => {
  individual.trips.forEach(trip => {
    cardWrapper.innerHTML += `
    <div class="trip-card">
      <div class="card-img">
        <img src='https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80'>
        <div class="card-views">
            <span class="pending-trip-heading hidden">Adventure Pending</span>
        </div>
      </div>
      <div class="card-info">
        Destination: <br>
        <h2><span class="card-destination">Toyko, Japan</span></h2>
        <br>
        People Traveling: 
        <div class="people-traveling">
          <h4>4</h4>
        </div> <!-- closes people-traveling -->
        <br>
        Travel Dates: <br>
        <div class="travel-dates">
          <h4>2022/12/28 - 2023/01/17</h4>
        </div> <!-- closes travel-dates -->
        <br>
        <div class="costs">
          <strong>ESTIMATED TOTAL COSTS: $<span class="total-cost"></span></strong>
          <br>
          Lodging: $<span class="lodging-cost"></span><br>
          Flights: $<span class="flights-cost"></span><br>
        </div>
      </div> <!-- closes card-info -->
    </div><!-- closes class="card add-new-trip"   -->`
  });
};


displayTrips();