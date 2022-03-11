import { findStateName } from "./findStateName";
import { ProjectNames } from '../models/ProjectNames.enum';

export interface fullAddress {
  address?: string;
  zipcode?: string;
  city?: string;
  state?: string;
}

//Project State Management


const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export const countCommas = (addressString: string) => {
  let commaCounter = 0;
  let address: fullAddress = {}
  addressString.split('').forEach(element => {
    if (element == ',') commaCounter++;

  });
  return commaCounter;
}

export const splitAddressMeshed = (address: string, state: string) => {

  const splitAddress: fullAddress = {
    address: '',
    zipcode: '',
    city: '',
    state: findStateName(state),
  };

  if (!address.includes(',')) return splitAddress;

  const streetAddress = address.split(',')[0].split(' ');

  for (let i = 0; i < streetAddress.length; i++) {
    const element = streetAddress[i];
    if (i == streetAddress.length - 1) {
      const splitCity: string[] = element.split('');
      for (let i = 0; i < splitCity.length; i++) {
        const char = splitCity[i];
        if (!numbers.includes(char)) {
          splitAddress.city = splitCity.slice(i).join('');
          splitAddress.address += splitCity.slice(0, i).join('');
          break;
        }
      }
    } else {
      splitAddress.address += element + ' ';
    }
  }

  splitAddress.state = findStateName(
    address.split(',')[1].trim().split(' ')[0]
  );
  splitAddress.zipcode = address.split(',')[1].trim().split(' ')[1];

  return splitAddress;
}


export const splitTwoCommaAddress = (address: string, state: string, fn: string): fullAddress => {


  const addressArray = address.split(',')
  // this.treasurer.Tr(addressArray)
  const splitStateZip = addressArray[2].trim().split(' ')
  const splitAddress: fullAddress = {}
  if (fn !== 'JacobRes') {
    splitAddress.address = addressArray[0]
    splitAddress.zipcode = splitStateZip[1]
    splitAddress.city = addressArray[1]
    splitAddress.state = findStateName(state);
  }
  else {
    splitAddress.address = addressArray[0] + addressArray[1]
    splitAddress.zipcode = splitStateZip[1]
    splitAddress.city = splitStateZip[0]
    splitAddress.state = findStateName(state);
  }
  return splitAddress;
}

export const splitOneCommaAddress = (address: string, stateName: string, fn?: ProjectNames) => {

  if (!address.includes(',')) {
    return {
      address: '',
      zipcode: '',
      city: '',
      state: '',
    }
  }
  const addressArray = address.split(',')

  const splitAddress: fullAddress = {
    address: addressArray[0],
    zipcode: '',
    city: '',
    state: findStateName(stateName),
  };
  if (!address.includes(',')) {
    return splitAddress;
  }

  const splitSecondPartOfAddress = addressArray[1].trim().split(' ')
  const splitFirstPartOfAddress = addressArray[0].trim().split(' ')
  if (fn !== ProjectNames.CristinaStLeg) {

    if (splitSecondPartOfAddress.length == 2) {
      splitAddress.zipcode = splitSecondPartOfAddress[1]
      splitAddress.city = splitSecondPartOfAddress[0];
    } else {
      splitAddress.city = splitSecondPartOfAddress[0] + splitSecondPartOfAddress[1];
      splitAddress.zipcode = splitSecondPartOfAddress[2]
    }
  } else {
    console.log('cristina')
    splitAddress.city = splitFirstPartOfAddress[splitFirstPartOfAddress.length - 1]
    splitAddress.state = findStateName(stateName);
    splitAddress.zipcode = splitSecondPartOfAddress[1];
    splitAddress.address = splitFirstPartOfAddress.slice(0, splitFirstPartOfAddress.length).join();
  }
  return splitAddress;
}

export const splitThreeCommaAddress = (address: string, state: string) => {

  const addressArray = address.split(',')

  const splitAddress: fullAddress = {
    address: addressArray[0],
    zipcode: '',
    city: '',
    state: findStateName(state),
  };
  if (!address.includes(',')) {
    return splitAddress;
  }

  splitAddress.address = addressArray[0];
  splitAddress.city = addressArray[1];
  splitAddress.zipcode = addressArray[3];
  splitAddress.state = findStateName(state);
  return splitAddress;
}