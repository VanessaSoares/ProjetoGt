import axios from 'axios';
import API_DOMAIN from '../../config/api'
export const FETCH_PEOPLE = 'FETCH_PEOPLE';
export const PEOPLE_SUCCESS =  'PEOPLE_SUCCESS';
export const PEOPLE_CHANGED ='PEOPLE_UPDATE';

export const fetchPeople = () => {
  return dispatch =>{
    axios.get(`${API_DOMAIN}/pessoas`)
    .then((resp) => {
       dispatch(peopleSuccess(resp.data));
    })
    .catch(resp => {
        console.log(resp);
    });
  }
}

export const peopleChanged = (payload) => {
  return {
    type: PEOPLE_CHANGED,
    payload
  }
};

export const peopleSuccess = (payload) => {
  return {
    type: PEOPLE_SUCCESS,
    payload
  }
};
 


