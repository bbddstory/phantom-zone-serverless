import { GOTO_PAGE, SWITCH_CAT, SYNC_CAT } from '../actions/dataActions';
import { SEARCH_RETURN } from '../actions/searchActions';
import { LOAD_HOME_LISTS, REMOVE_HOME_LIST_ITEM } from '../actions/homeActions';
import { LOAD_DETAILS, SAVE_COMMENT, DEL_COMMENT, SAVE_NEW, UPDATE_BUFFER_DETAILS } from '../actions/detailsActions';
import { CATS, pageSettings } from '../util/utils';

const ps = pageSettings();

const init = {
  category: CATS.home,
  prevCat: CATS.home, // Previous category
  details: {},
  buffer: {},
  search: {},
  latest: {},
  watchLater: {},
  recomm: {},
  pages: {
    itemCnt: 0, // Total number of records in selected category
    pageCnt: 1, // Total number of pages is initialised as 1, so that on the UI, it will show up as '1/1'
    ipp: ps.ipp, // Items per page
    currPage: ps.currPage,
    startAt: ps.startAt, // Start index of items on current page
    endAt: ps.endAt, // End index of items on current page
  },
};

export default function dataReducer(state = init, action) {
  const ns = (Object).assign({}, state);
  const bufferObj = {};
  const searchObj = {};

  switch (action.type) {
    case LOAD_HOME_LISTS:
      [ns.latest, ns.watchLater, ns.recomm] = action.data.data;
      ns.prevCat = ns.category;

      return ns;
    case REMOVE_HOME_LIST_ITEM:
      delete ns[action.list][action.key];
      // let arr = [];
      // for (let i = 0; i < ns[action.list].length; i++) {
      //   if (ns[action.list][i].id !== action.key) {
      //     arr.push(ns[action.list][i])
      //   }
      // }
      // ns[action.list] = arr;
      return ns;
    case SWITCH_CAT:
      ns.category = action.cat;

      // Reset all pagination related values
      ns.pages.itemCnt = 0;
      ns.pages.pageCnt = 1;
      ns.pages.ipp = ps.ipp;
      ns.pages.currPage = ps.currPage;
      ns.pages.startAt = ps.startAt;
      ns.pages.endAt = ps.endAt;

      return ns;
    case GOTO_PAGE:
      Object.keys(action.buffer).forEach((key) => {
        bufferObj[action.buffer[key].id] = action.buffer[key];
      });
      ns.buffer = bufferObj;

      ns.pages.itemCnt = action.itemCnt;
      ns.pages.pageCnt = Math.ceil(action.itemCnt / init.pages.ipp);
      ns.pages.currPage = action.currPage;
      ns.pages.startAt = action.startAt;
      ns.pages.endAt = action.endAt;

      return ns;
    case LOAD_DETAILS:
      ns.details[action.list] = action.details;

      return ns;
    case SYNC_CAT:
      ns.prevCat = ns.category;

      return ns;
    case SAVE_NEW:
      if (ns.category === action.arr[0]) {
        ns.buffer[action.arr[1]] = action.vc;
      }

      return ns;
    case UPDATE_BUFFER_DETAILS:
      if (action.isSearch) {
        ns.search[state.key] = action.vc;
        if (ns.buffer[state.key]) {
          ns.buffer[state.key] = action.vc;
        }
      } else {
        ns.buffer[state.key] = action.vc;
      }

      return ns;
    case SAVE_COMMENT:
      if (action.isSearch) {
        const ck = Object.keys(action.values)[0];
        ns.search[state.key].comments[ck] = action.values[ck];
        if (ns.buffer[state.key]) {
          ns.buffer[state.key].comments[ck] = action.values[ck];
        }
      } else {
        const ck = Object.keys(action.values)[0];
        ns.buffer[state.key].comments[ck] = action.values[ck];
      }

      return ns;
    case DEL_COMMENT:
      if (action.isSearch) {
        delete ns.search[state.key].comments[action.id];
        if (ns.buffer[state.key]) {
          delete ns.buffer[state.key].comments[action.id];
        }
      } else {
        delete ns.buffer[state.key].comments[action.id];
      }

      return ns;
    case SEARCH_RETURN:
      Object.keys(action.results).forEach((key) => {
        searchObj[action.results[key].id] = action.results[key];
      });
      ns.search = searchObj;

      return ns;
    default:
      return state;
  }
}
