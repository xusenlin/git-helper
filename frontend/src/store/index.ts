import { mainReducer } from "./sliceMain"
import { categoriesReducer } from "./sliceCategory"
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({ reducer: {categories:categoriesReducer,main:mainReducer}});

export { store };
