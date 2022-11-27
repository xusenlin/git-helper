import { createStore } from 'redux';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';



const store = createStore(reducer, composeWithDevTools());
const persister = '';

export { store, persister };
