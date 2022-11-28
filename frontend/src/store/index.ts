import { mainReducer } from "./sliceMain"
import { categoryReducer } from "./sliceCategory"
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({ reducer: {category:categoryReducer,main:mainReducer}});

export { store };
