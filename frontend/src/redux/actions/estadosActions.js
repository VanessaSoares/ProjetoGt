import axios from 'axios';
export const FETCH_UF =  'FETCH_UF';
export const UF_SUCCESS =  'UF_SUCCESS';
export const UF_CHANGED ='UF_UPDATE';

export const ufChanged = (payload) => {
  return {
    type: UF_CHANGED,
    payload
  }
};

export const ufSuccess = (payload) => {
  return {
    type: UF_SUCCESS,
    payload
  }
};
 