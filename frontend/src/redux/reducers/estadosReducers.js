export const UF_SUCCESS =  'UF_SUCCESS';
export const UF_CHANGED ='UF_UPDATE';


const initialState = {
  ufs: [], 
 
};
export default function ufs(state = initialState, action) {
  switch (action.type) {
    case UF_SUCCESS: {
      return {
        ...state, 
        ufs: action.payload,
      };
    }
    case UF_CHANGED: {
      return {
        ...state, 
        ufs: action.payload,
      };
    }
    default:
      return state;
  }
}