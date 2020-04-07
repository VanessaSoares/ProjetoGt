export const PEOPLE_SUCCESS =  'PEOPLE_SUCCESS';
export const PEOPLE_CHANGED ='PEOPLE_UPDATE';


const initialState = {
  peoples: [], 
   
};

export default function peoples(state = initialState, action) {
  switch (action.type) {
    case PEOPLE_SUCCESS: {
      return {
        ...state, 
        peoples: action.payload,
      };
    }
    case PEOPLE_CHANGED: {
      return {
        ...state, 
        peoples: action.payload,
      };
    }
    default:
      return state;
  }
}