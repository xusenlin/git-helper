import {Action} from 'redux'
import {Main} from "./dataType"
import * as actionTypes from './actions';

export const initialState: Main = {
  selectedRepositoryName: "",
  selectedRepositoryBranch: "",
  currentlyRepositoryAllBranch: ['master', 'main']
}

export interface mainAction extends Action, Main {
}

const mainReducer = (state = initialState, action: mainAction) => {
  switch (action.type) {
    case actionTypes.SET_SELECT_REPO:
      return {
        ...state,
        selectedRepositoryName: action.selectedRepositoryName
      };
    case actionTypes.SET_SELECT_BRANCH:
      return {
        ...state,
        selectedRepositoryBranch: action.selectedRepositoryBranch
      };
    default:
      return state;
  }
};

export default mainReducer;
