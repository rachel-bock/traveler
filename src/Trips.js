class Trips {
  constructor(data) {
    this.trips = data.trips;
  }

  returnSingleUserTrips(userID) {
    
    let output = this.trips.filter(trip => trip.userID === userID);
    if (output.length === 0) {
      return 'Unable to locate associated trips';
    }
    return output;
  }
}

export default Trips;