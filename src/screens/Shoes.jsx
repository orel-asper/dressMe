import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import GetMeData from "../service/GetMeData";
import { Button } from "react-native-paper";
import {
  set_remembered_sets,
  set_clear_remembered,
  set_show_finished_btn,
} from "../../redux/store";

const Shoes = ({ navigation }) => {
  const memoizedState = useSelector((state) => state.myStateIsRemembered),
    showBtn = useSelector((state) => state.normalState.showBtn),
    { rememberMyPants, rememberMyShoes, rememberMyShirts } = memoizedState,
    allData = memoizedState.rememberMySets,
    dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <GetMeData type={"shoes"} />
      {showBtn ? (
        <Button
          style={styles.btnsLong}
          mode="contained"
          onPress={() => {
            dispatch(
              set_remembered_sets(...allData, [
                rememberMyPants,
                rememberMyShoes,
                rememberMyShirts,
              ])
            );
            dispatch(set_clear_remembered([]));
            dispatch(set_show_finished_btn(false));
            navigation.navigate("Dress Me");
          }}
        >
          Finish Shopping
        </Button>
      ) : null}
    </View>
  );
};

export default Shoes;

const styles = StyleSheet.create({
  btnsLong: {
    margin: 5,
    justifyContent: "center",
    alignSelf: "center",
    width: "70%",
    height: "6%",
  },
});
