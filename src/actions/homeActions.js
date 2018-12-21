import axios from 'axios';
import { NODE_URL } from '../util/utils';

// Action types
export const LOAD_HOME_LISTS = 'LOAD_HOME_LISTS';
export const REMOVE_HOME_LIST_ITEM = 'REMOVE_HOME_LIST_ITEM';
export const LOAD_LATEST = 'LOAD_LATEST';
export const LOAD_WATCH_LATER = 'LOAD_WATCH_LATER';
export const LOAD_RECOMM = 'LOAD_RECOMM';

// Action creators
export function loadHomeListsAct() {
  return (dispatch, getState) => {
    axios.post(`${NODE_URL()}/home/lists`, {
      token: getState().loginReducer.token,
      email: getState().loginReducer.email,
    }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: LOAD_HOME_LISTS, data: res.data });
      }
    }).catch(err => console.log(err));
  };
}

export function removeHomeListItemAct(list, key) {
  return (dispatch, getState) => {
    axios.post(`${NODE_URL()}/home/del_item`, {
      token: getState().loginReducer.token,
      email: getState().loginReducer.email,
      key,
      list,
    }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: REMOVE_HOME_LIST_ITEM, key, list });
      }
    }).catch((err) => {
      console.log(err);
    });
  };
}
