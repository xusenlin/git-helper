import {mainReducer} from "./sliceMain";
import {configureStore} from '@reduxjs/toolkit';
import {categoriesReducer} from "./sliceCategory";
import {SettingState,settingReducer} from "./sliceSetting";
import {CategoryState} from "./sliceCategory";
import { Main } from "./sliceMain"

export type State = {
  categories:CategoryState
  main:Main
  setting:SettingState
}

const store = configureStore({
  reducer: {
    main: mainReducer,
    categories: categoriesReducer,
    setting:settingReducer
  }
});

export {store};
