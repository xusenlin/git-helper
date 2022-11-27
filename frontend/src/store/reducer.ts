import {combineReducers} from 'redux';

// reducer import
import categoryReducer from './reducerCategory';
import mainReducer from './reducerMain';


const reducer = combineReducers({
  category: categoryReducer,
  main: mainReducer,
});

export default reducer;
