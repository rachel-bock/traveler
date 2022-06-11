class Destinations {
  constructor(dataset) {
    this.destinations = dataset.destinations;
  }

  calculateFlightCostPerPerson(destinationID, numOfPeople) {
    let destination = this.destinations.filter(location => location.id === destinationID);
    return destination[0].estimatedFlightCostPerPerson * numOfPeople;
  }

  calculateLodgingCost(destinationID, numOfDays){
    let destination = this.destination.filter(location => location.id === destinationID);
    return destination[0].estimatedLodgingCostPerDay * numOfDays;
  }
}

export default Destinations;