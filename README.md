# Traveler, The Travel Tracker

## Table of Contents
  - [Abstract](#abstract)
  - [Code Architecture](#code-architecture)
  - [Illustrations](#illustrations)
  - [Installation](#installation)
  - [Contributors](#contributors)
  - [Wins](#wins)
  - [Challenges](#challenges)
  - [Project Specs](#project-specs)
  - [Acknowledgements](#acknowledgements)

## Abstract
  - Traveler is an application where travelers can plan their adventures.  The site shows the cost per trip and breaks down the cost into lodging and flight costs.  The site also shows the total cost for trips during the year 2022.  In addition, the site allows them to add new trips that are then shown as pending adventures.  This project was developed using Test-Driven Development (using Mocha and Chai) and accessibility principles.  It also incorporated skills such as working with an API and making fetch requests to and from a server. 

## Code Architecture
  - HTML / CSS / JavaScript

## Illustrations

![Traveler, The Travel Tracker](/src/images/travel-tracker.gif)

## Installation
**To navigate the website live, a server download is required.**
  1. Follow the instructions to download and install the API [here](https://github.com/turingschool-examples/travel-tracker-api)
  2. Once you've installed the API, run the server with `npm start`
  3. You'll need to keep the API running, so open a new terminal tab.

**Now, get Traveler running:**
  1. Clone down this repo: <br>
      `git clone https://github.com/rachel-bock/traveler`
  2. Install the necessary package dependencies - <br>
      `npm install`
  3. Run Traveler with `npm start`
  4. With both the server and the application running, visit `http://localhost:8080/` in your browser.
  5. To log in, use a username from `traveler01` to `traveler50` with the password `travel`.

## Contributors
  - [Rachel Bock](https://www.linkedin.com/in/rachelbock)

## Wins
  - This was one of the most difficult projects to date.  I felt like it stretched my abilities more than other projects in the past.  For example, having the user login was a new feature that I was able to implement.
  - Accessibility was addressed in this project as well.  For example, even though there is no input necessary on the trip cards, a user can tab through the trip cards to view each one without using the mouse.

## Challenges
  - There is room for more error handling and input validation.  For example, as it stands now, the form that allows users to add a new adventure will accept negative numbers for travelers and trip duration.  This is a future functionality to be addressed.
  - Future improvements also could include sorting the trips into past, present, current and future trips.
  - The current application only calculates the total spent for the year 2022.  This would need to be updated each year.

## Project Specs
  - The project spec & rubric can be found [here](https://frontend.turing.edu/projects/travel-tracker.html).

## Acknowledgements
  - I could not have done this project without the help and direction from [Artan Myrtolli](https://www.linkedin.com/in/artan-myrtolli-567411119/).
