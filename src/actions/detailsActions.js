import axios from 'axios';
import { NODE_URL } from '../util/utils';
import { TOGGLE_LOADER } from './uiActions';

// Action types
export const LOAD_DETAILS = 'LOAD_DETAILS';
export const WATCH_LATER = 'WATCH_LATER';
export const RECOMM = 'RECOMM';
export const SAVE_COMMENT = 'SAVE_COMMENT';
export const DEL_COMMENT = 'DEL_COMMENT';
export const UPDATE_BUFFER_DETAILS = 'UPDATE_BUFFER_DETAILS';
export const SAVE_NEW = 'SAVE_NEW';

// Action creators
export function loadDetailsAct(key, list, reload) {
  return (dispatch, getState) => {
    dispatch({ type: TOGGLE_LOADER, status: true });
    axios.post(`${NODE_URL()}/details/load`, {
      token: getState().loginReducer.token,
      key,
    }).then((res) => {
      if (res.status === 200) {
        // This is a temporary fix as all categories names in the Db are currently capitalised
        res.data.details.category = res.data.details.category.toLowerCase();
        if (reload) {
          getState().dataReducer.category = res.data.details.category;
          // getState().dataReducer.prevCat = res.data.details.category;
        }

        dispatch({ type: LOAD_DETAILS, list, details: res.data.details });
        dispatch({ type: TOGGLE_LOADER, status: false });
      }
    }).catch(err => console.log(err));
  };
}

export function watchLaterAct(id) {
  return (dispatch, getState) => {
    axios.post(`${NODE_URL()}/videos/watchlater`, {
      token: getState().loginReducer.token,
      email: getState().loginReducer.email,
      key: id,
    }).then((res) => {
      if (res.status === 201) {
        // dispatch({ type: LOAD_DETAILS, list: list, details: res.data.details });
        // dispatch({ type: TOGGLE_LOADER, status: false });
      }
    }).catch(err => console.log(err));
    // dispatch({ type: WATCH_LATER });
  };
}

export function recommAct(vid, friendEmail) {
  return (dispatch, getState) => {
    axios.post(`${NODE_URL()}/videos/recomm`, {
      token: getState().loginReducer.token,
      vid,
      friendEmail,
    }).then((res) => {
      if (res.status === 201) {
        // dispatch({ type: LOAD_DETAILS, list: list, details: res.data.details });
        // dispatch({ type: TOGGLE_LOADER, status: false });
      }
    }).catch(err => console.log(err));
    // dispatch({ type: WATCH_LATER });
  };
}

// export function commentAct(values) {
//   return async (dispatch, getState) => {
//     let firebase = getState().loginReducer.firebase;

//     if (firebase.apps) {
//       dispatch({ type: TOGGLE_LOADER, status: true });

//       await firebase.database().ref(getState().dataReducer.category + '/' + getState().dataReducer.key + '/comments')
//         .update(values).then((snapshot) => {
//           dispatch({ type: TOGGLE_LOADER, status: false });
//           dispatch({ type: SAVE_COMMENT, values, isSearch: getState().uiReducer.isSearch });
//         });
//     }
//   }
// }

// export function delCommentAct(id) {
//   return async (dispatch, getState) => {
//     let firebase = getState().loginReducer.firebase;

//     if (firebase.apps) {
//       dispatch({ type: TOGGLE_LOADER, status: true });

//       await firebase.database().ref(getState().dataReducer.category + '/' + getState().dataReducer.key + '/comments/' + id)
//         .remove().then((snapshot) => {
//           dispatch({ type: TOGGLE_LOADER, status: false });
//           dispatch({ type: DEL_COMMENT, id, isSearch: getState().uiReducer.isSearch });
//         });
//     }
//   }
// }

export function saveDetailsAct(values) {
  return (dispatch, getState) => {
    dispatch({ type: TOGGLE_LOADER, status: true });
    axios.post(`${NODE_URL()}/videos/update`, {
      token: getState().loginReducer.token,
      details: values,
    }).then((res) => {
      if (res.status === 200) {
        // dispatch({ type: LOAD_DETAILS, list: list, details: res.data.details });
        // dispatch({ type: TOGGLE_LOADER, status: false });
        window.location.reload();
      }
    }).catch(err => console.log(err));
  };

  // return async (dispatch, getState) => {
  //   let firebase = getState().loginReducer.firebase;

  //   if (firebase.apps) {
  //     dispatch({ type: TOGGLE_LOADER, status: true });

  //     let vc = (<any>Object).assign({}, values);
  //     let ref = '';
  //     let isNewRec = getState().uiReducer.newRec;

  //     if (isNewRec) {
  //       ref = values.cat

  //       // Get the max index of corresponding category, then plus one and give it to vc (values copy)
  //       await firebase.database().ref(ref)
  //         .orderByChild('index').limitToLast(1)
  //         .once('value').then((snapshot) => {
  //           let buffer = snapshot.val();

  //           if (buffer) {
  //             for (let p in buffer) {
  //               vc.index = buffer[p]['index'] + 1;
  //             }
  //           }
  //         });
  //     } else {
  //       ref = values.cat + '/' + getState().dataReducer.key
  //     }

  //     if (isNewRec) {
  //       await firebase.database().ref(ref)
  //         .push(vc).then((snapshot) => {
  //           let arr = snapshot.path.pieces_;

  //           dispatch({ type: TOGGLE_LOADER, status: false });
  //           dispatch({ type: SAVE_NEW, vc, arr }); // For a new record, add it to buffer if category matches
  //           dispatch(toggleEditDetailsAct(false, false));
  //         });
  //     } else {
  //       await firebase.database().ref(ref)
  //         .update(vc).then((snapshot) => {
  //           dispatch({ type: TOGGLE_LOADER, status: false });
  //           // if (!getState().uiReducer.isSearch) {
  //           dispatch({ type: UPDATE_BUFFER_DETAILS, vc, isSearch: getState().uiReducer.isSearch });
  //           // };
  //           dispatch(toggleEditDetailsAct(false, false));
  //         });
  //     }
  //   }
  // }
}
