class Travelers {
  constructor(dataset) {
    this.travelers = dataset.travelers;
  }

  returnSingleUser(userID) {
    return this.travelers.filter(traveler => traveler.id === userID);
  }
}

export default Travelers;