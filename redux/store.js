import AsyncStorage from '@react-native-community/async-storage';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { rememberReducer, rememberEnhancer } from 'redux-remember';


let SET_XX = 'SET_XX',
    SET_X1 = 'SET_X1',
    SET_X2 = 'SET_X2',
    SET_X3 = 'SET_X3',


    myStateIsRemembered = (state = '', { type, payload }) => {
        switch (type) {
            case SET_XX:
                return payload;
            default:
                return state;
        }
    },

    myStateIsForgotten = (state = '', { type, payload }) => {
        switch (type) {
            case SET_X1:
                return payload;
            default:
                return state;
        }
    },

    reducers = {
        myStateIsRemembered,
        myStateIsForgotten
    },

    rememberedKeys = ['myStateIsRemembered']; // 'myStateIsForgotten' will be forgotten, as it's not in this list

export const store = createStore(
    rememberReducer(
        combineReducers(reducers)
    ),
    compose(
        applyMiddleware(
            // ...
        ),
        rememberEnhancer(
            AsyncStorage, // or your own custom storage driver
            rememberedKeys
        )
    )
);

// Continue using the redux store as usual...