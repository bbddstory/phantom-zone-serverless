import axios from 'axios';

import { NODE_URL } from '../util/utils';

// Action types
export const SEARCH = 'SEARCH';
export const SEARCH_RETURN = 'SEARCH_RETURN';
export const SET_SEARCH_FLAG = 'SET_SEARCH_FLAG';

// Action creators
export function searchAct(key) {
  return (dispatch, getState) => {
    axios.post(`${NODE_URL()}/search`, {
      token: getState().loginReducer.token,
      key,
      type: 1, // 0: fuzzy search, 1: exact search
    }).then((res) => {
      const { results } = res.data;

      if (res.status === 200) {
        dispatch({ type: SET_SEARCH_FLAG });
        dispatch({ type: SEARCH_RETURN, results });
        window.location.hash = '#/main/search';
      }
    }).catch((err) => {
      console.log(err);
    });
  };
}
