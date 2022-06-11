import chai from 'chai';
import Trips from '../src/Trips';
const expect = chai.expect;
import { 
  sampleTrips, 
  singleTravelerTrips
 } from './sample-trips-data';

describe('Trips', function () {

  let sampleData;
  let theTrips;
  let individualTrips;

  beforeEach(() => {
    sampleData = sampleTrips;
    theTrips = new Trips(sampleData);

  });

  it('should be a function', () => {
    expect(Trips).to.be.a('function');
  });

  it('should be an instance of Trips', () => {
    expect(theTrips).to.be.instanceOf(Trips);
  });

  it('should have a property containing all trips', () => {
    expect(theTrips.trips).to.equal(sampleData.trips);
  });

  it('should return all trips for a single traveler', () => {
    individualTrips = theTrips.returnSingleUserTrips(50);
    expect(individualTrips).to.deep.equal(singleTravelerTrips);
  });

  it('should give an error if there is not a trip for a user', () => {
    individualTrips = theTrips.returnSingleUserTrips(51);
    expect(individualTrips).to.equal('Unable to locate associated trips');
  });
});