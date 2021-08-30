import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import GetMeData from "../service/GetMeData";
import { Button } from "react-native-paper";
import { set_remembered_sets, set_show_finished_btn } from "../../redux/store";
import Search from "./Search";

const Pants = ({ navigation }) => {
  const memoizedState = useSelector((state) => state.myStateIsRemembered),
    showBtn = useSelector((state) => state.normalState.showBtn),
    { rememberMyPants, rememberMyShoes, rememberMyShirts, rememberMySets } =
      memoizedState,
    newData = [rememberMyPants, rememberMyShoes, rememberMyShirts],
    dispatch = useDispatch();

  const FinishShopping = async () => {
    if (typeof newData !== "undefined" && newData.length > 0) {
      dispatch(set_remembered_sets(rememberMySets.concat(newData)));
      dispatch(set_show_finished_btn(false));
      navigation.navigate("Dress Me");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Search />
      <GetMeData type={"pants"} />
      {showBtn ? (
        <Button
          style={styles.btnsLong}
          mode="contained"
          onPress={FinishShopping}
        >
          Finish Shopping
        </Button>
      ) : null}
    </View>
  );
};

export default Pants;

const styles = StyleSheet.create({
  btnsLong: {
    margin: 5,
    justifyContent: "center",
    alignSelf: "center",
    width: "70%",
    height: "6%",
  },
});
