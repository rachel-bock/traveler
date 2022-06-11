// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

import {
  promise
} from './apiCalls';

import Travelers from './Travelers';
import Destinations from './Destinations';
import Trips from './Trips';

import './images/turing-logo.png'
import './images/map-banner.png'
import './images/mapBanner.png'
import './images/one.jpg'
import './images/two.jpg'
import './images/three.jpg'
import './images/four.jpg'
import './images/five.jpg'
import './images/six.jpg'

let destinations;
let travelers;
let trips;

const getRandomID = () => {
  return Math.floor(Math.random() * 50);
}

const travelerID = getRandomID();

const getData = () => {
  promise.then(data => {
    travelers = data[0];
    trips = data[1];
    destinations = data[2];
    console.log(data);
  });
}

getData();



