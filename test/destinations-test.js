import chai from 'chai';
import Destinations from '../src/Destinations';
const expect = chai.expect;
import { 
  sampleDestinations
 } from './sample-destinations';

describe('Destinations', function () {

  let theDestinations;
  let totalFlightCost;
  let costOfLodging;
  let people = 4;
  let days = 5;
  let destinationID = 8;

  beforeEach(() => {
    theDestinations = new Destinations(sampleDestinations);
  });

  it('should be a function', () => {
    expect(Destinations).to.be.a('function');
  });

  it('should be an instance of Trips', () => {
    expect(theDestinations).to.be.instanceOf(Destinations);
  });

  it('should have a property containing all destinations', () => {
    expect(theDestinations.destinations).to.deep.equal(sampleDestinations.destinations);
  });

  it('should be able to calculate the total flight cost for a specific number of people', () => {
    totalFlightCost = theDestinations.calculateFlightCostPerPerson(destinationID,people);
    expect(totalFlightCost).to.equal(4000);
  });

  it('should be able to calculate the cost of lodging for a given number of days', () => {
    costOfLodging = theDestinations.calculateLodgingCost(destinationID, days);
    expect(costOfLodging).to.equal(625);
  });
});