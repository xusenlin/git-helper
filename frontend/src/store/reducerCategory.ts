import { Action } from 'redux'
import { Category } from "./dataType"
import * as actionTypes from './actions';
export const initialState:Category[] = [
    {
        name: 'Recent',
        repositories:[
            {name:"Home/marewood1",path:"/User/Home/marewood"},
            {name:"Home/marewood2",path:"/User/Home/marewood"},
            {name:"Home/marewood3",path:"/User/Home/marewood"},
            {name:"Home/marewood4",path:"/User/Home/marewood"}
        ]
    },
    {
        name: 'Berry',
        repositories:[
            {name:"Berry/marewood1",path:"/User/Home/marewood"},
        ]
    }
];

const categoryReducer = (state = initialState, action:Action) => {
    switch (action.type) {
        case actionTypes.SET_CATEGORY:
            return state;
        default:
            return state;
    }
};

export default categoryReducer;
