import {mainReducer} from "./sliceMain";
import {configureStore} from '@reduxjs/toolkit';
import {categoriesReducer} from "./sliceCategory";


const store = configureStore({
  reducer: {
    main: mainReducer,
    categories: categoriesReducer
  }
});

export {store};
