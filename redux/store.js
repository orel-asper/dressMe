import AsyncStorage from "@react-native-community/async-storage";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { rememberReducer, rememberEnhancer } from "redux-remember";

let normaState = {
    selectedSize: "",
  },
  memoizedState = {
    rememberMyShirts: [],
    rememberMyPants: [],
    rememberMyShoes: [],
  },
  SET_SELECTED_SIZE = "SET_SELECTED_SIZE",
  SET_REMEMBERED_SHIRTS = "SET_REMEMBERED_SHIRTS",
  SET_REMEMBERED_PANTS = "SET_REMEMBERED_PANTS",
  SET_REMEMBERED_SHOES = "SET_REMEMBERED_SHOES";

const myStateIsRemembered = (state = memoizedState, { type, payload }) => {
  console.log(payload, "globalState");
  switch (type) {
    case SET_REMEMBERED_SHIRTS:
      return {
        ...state,
        rememberMyShirts: payload,
      };
    case SET_REMEMBERED_PANTS:
      return {
        ...state,
        rememberMyPants: payload,
      };
    case SET_REMEMBERED_SHOES:
      return {
        ...state,
        rememberMyShoes: payload,
      };
    default:
      return state;
  }
};

const normalState = (state = normaState, { type, payload }) => {
  switch (type) {
    case SET_SELECTED_SIZE:
      return {
        ...state,
        selectedSize: payload,
      };
    default:
      return state;
  }
};

const reducers = {
    myStateIsRemembered,
    normalState,
  },
  rememberedKeys = ["myStateIsRemembered"]; // 'myStateIsForgotten' will be forgotten, as it's not in this list

export const store = createStore(
  rememberReducer(combineReducers(reducers)),
  compose(
    applyMiddleware(),
    // ...
    rememberEnhancer(
      AsyncStorage, // or your own custom storage driver
      rememberedKeys
    )
  )
);

// Continue using the redux store as usual...
export const set_selected_size = (value) => ({
  type: SET_SELECTED_SIZE,
  payload: value,
});
//RememberME
export const set_remembered_shirts = (value) => ({
  type: SET_REMEMBERED_SHIRTS,
  payload: value,
});
export const set_remembered_pants = (value) => ({
  type: SET_REMEMBERED_PANTS,
  payload: value,
});
export const set_remembered_shoes = (value) => ({
  type: SET_REMEMBERED_SHOES,
  payload: value,
});
