import chai from 'chai';
import Travelers from '../src/Travelers';
const expect = chai.expect;
import { 
  travelers, 
  traveler42
 } from './sample-travelers';

describe('Travelers', function () {

  let theTravelers;
  let individual;
  let userID = 42;

  beforeEach(() => {
    theTravelers = new Travelers(travelers);
  });

  it('should be a function', () => {
    expect(Travelers).to.be.a('function');
  });

  it('should be an instance of Travelers', () => {
    expect(theTravelers).to.be.instanceOf(Travelers);
  });

  it('should have a property containing all travelers', () => {
    expect(theTravelers.travelers).to.deep.equal(travelers.travelers);
  });

  it('should return information about a single traveler', () => {
    individual = theTravelers.returnSingleUser(userID);
    expect(individual).to.deep.equal(traveler42);
  });

});