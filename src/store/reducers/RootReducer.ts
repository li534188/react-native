import {combineReducers} from 'redux';
import homeReduce from './homeReduce';

const RootReducer = combineReducers({
  home: homeReduce, //刚刚创建的reducer
});
export default RootReducer;
