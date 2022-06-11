class Destinations {
  constructor(dataset) {
    this.destinations = dataset.destinations;
  }

  calculateFlightCostPerPerson(destinationID, numOfPeople) {
    let destination = this.destinations.filter(location => location.id === destinationID);
    return destination[0].estimatedFlightCostPerPerson * numOfPeople;
  }

  calculateLodgingCost(destinationID, numOfDays) {
    let destination = this.destinations.filter(location => location.id === destinationID);
    return destination[0].estimatedLodgingCostPerDay * numOfDays;
  }

  calculateTripCost(destinationID, people, days) {
    return this.calculateFlightCostPerPerson(destinationID, people) + this.calculateLodgingCost(destinationID, days);
  }
}

export default Destinations;