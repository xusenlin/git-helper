import {mainReducer} from "./sliceMain";
import {configureStore} from '@reduxjs/toolkit';
import {categoriesReducer} from "./sliceCategory";
import {SettingState,settingReducer} from "./sliceSetting";
import {CategoryState} from "./sliceCategory";
import { Main } from "./sliceMain"
import { DiffStateType,diffWorkReducer } from "./sliceWorkDiff"
import { DiffCommitState,diffCommitReducer } from "./sliceCommitDiff"

export type AsyncStatus = "loading"|"succeeded"|"failed"

export type State = {
  categories:CategoryState,
  main:Main,
  setting:SettingState,
  diffWork:DiffStateType,
  diffCommit:DiffCommitState,
}

const store = configureStore({
  reducer: {
    main: mainReducer,
    categories: categoriesReducer,
    setting:settingReducer,
    diffWork:diffWorkReducer,
    diffCommit:diffCommitReducer
  }
});


export {store};
