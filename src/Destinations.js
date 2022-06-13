/* eslint-disable max-len */
class Destinations {
  constructor(dataset) {
    this.destinations = dataset.destinations;
  }

  calculateFlightCostPerPerson(destinationID, numOfPeople) {
    if (numOfPeople === '') {
      numOfPeople = 0;
    }

    let destination = this.destinations.filter(location => location.id === parseInt(destinationID));
    
    if (!destination.length) {
      console.log(destinationID, "destinationID");
      console.log(this.destinations, "destinations");
      return 0;
    }

    return destination[0].estimatedFlightCostPerPerson * parseInt(numOfPeople) * 1.1;
  }

  calculateLodgingCost(destinationID, numOfDays) {
    let destination = this.destinations.filter(location => location.id === parseInt(destinationID));
    if (!destination.length) {
      console.log(destination.length)
      return 0;
    }
    console.log(numOfDays, "<<days");
    return destination[0].estimatedLodgingCostPerDay * numOfDays * 1.1;
  }

  calculateTripCost(destinationID, people, days) {
    return this.calculateFlightCostPerPerson(destinationID, people) + this.calculateLodgingCost(destinationID, days);
  }
}

export default Destinations;