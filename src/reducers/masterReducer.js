import { combineReducers } from 'redux';
import uiReducer from './uiReducer';
import loginReducer from './loginReducer';
import dataReducer from './dataReducer';

export default combineReducers({
  uiReducer,
  loginReducer,
  dataReducer,
});
