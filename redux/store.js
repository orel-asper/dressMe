import AsyncStorage from "@react-native-community/async-storage";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { rememberReducer, rememberEnhancer } from "redux-remember";
import "core-js/es6/symbol";
import "core-js/fn/symbol/iterator";

let normaState = {
  selectedSize: "",
  navigate: "",
  showBtn: false,
  search: "",
  startTime: "",
  endTime: "",
},
  memoizedState = {
    rememberMyShirts: [],
    rememberMyPants: [],
    rememberMyShoes: [],
    rememberMySets: [],
  },
  SET_SELECTED_SIZE = "SET_SELECTED_SIZE",
  SET_STSRT_TIME = "SET_STSRT_TIME",
  SET_ENDTIME = "SET_ENDTIME",
  SET_NAVIGATION = "SET_NAVIGATION",
  SET_REMEMBERED_SHIRTS = "SET_REMEMBERED_SHIRTS",
  SET_REMEMBERED_PANTS = "SET_REMEMBERED_PANTS",
  SET_REMEMBERED_SHOES = "SET_REMEMBERED_SHOES",
  SET_REMEMBERED_SETS = "SET_REMEMBERED_SETS",
  SET_CLEAR_REMEMBERED = "SET_CLEAR_REMEMBERED",
  SET_CLEAR_ALL = "SET_CLEAR_ALL",
  SET_SHOW_FINISHED_BTN = "SET_SHOW_FINISHED_BTN",
  SET_SEARCH = "SET_SEARCH";

const myStateIsRemembered = (state = memoizedState, { type, payload }) => {
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
    case SET_REMEMBERED_SETS:
      return {
        ...state,
        rememberMySets: payload,
      };
    case SET_CLEAR_REMEMBERED:
      return {
        ...state,
        rememberMyShirts: payload,
        rememberMyPants: payload,
        rememberMyShoes: payload,
      };
    case SET_CLEAR_ALL:
      return {
        rememberMySets: payload,
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
    case SET_NAVIGATION:
      return {
        ...state,
        navigate: payload,
      };
    case SET_SHOW_FINISHED_BTN:
      return {
        ...state,
        showBtn: payload,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: payload,
      };
    case SET_STSRT_TIME:
      return {
        ...state,
        startTime: payload,
      };
    case SET_ENDTIME:
      return {
        ...state,
        endTime: payload,
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
export const set_navigation = (value) => ({
  type: SET_NAVIGATION,
  payload: value,
});
export const set_show_finished_btn = (value) => ({
  type: SET_SHOW_FINISHED_BTN,
  payload: value,
});
export const set_search = (value) => ({
  type: SET_SEARCH,
  payload: value,
});
export const set_start_time = (value) => ({
  type: SET_STSRT_TIME,
  payload: value,
});
export const set_endtime = (value) => ({
  type: SET_ENDTIME,
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
export const set_remembered_sets = (value) => ({
  type: SET_REMEMBERED_SETS,
  payload: value,
});
export const set_clear_remembered = (value) => ({
  type: SET_CLEAR_REMEMBERED,
  payload: value,
});
export const set_clear_all = (value) => ({
  type: SET_CLEAR_ALL,
  payload: value,
});
