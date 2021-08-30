import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import GetMeData from "../service/GetMeData";
import { Button } from "react-native-paper";
import { set_remembered_sets } from "../../redux/store";
import Search from "./Search";

const Shirt = ({ navigation }) => {
  const memoizedState = useSelector((state) => state.myStateIsRemembered),
    { rememberMyPants, rememberMyShoes, rememberMyShirts, rememberMySets } =
      memoizedState,
    newData = [rememberMyPants, rememberMyShoes, rememberMyShirts],
    dispatch = useDispatch();

  const FinishChoosing = async () => {
    if (typeof newData !== "undefined" && newData.length > 0) {
      dispatch(set_remembered_sets(rememberMySets.concat(newData)));
      navigation.navigate("Dress Me");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Search />
      <GetMeData type={"shirts"} />
      <Button style={styles.btnsLong} mode="contained" onPress={FinishChoosing}>
        Continue
      </Button>
    </View>
  );
};

export default Shirt;

const styles = StyleSheet.create({
  btnsLong: {
    margin: 5,
    justifyContent: "center",
    alignSelf: "center",
    width: "70%",
    height: "6%",
  },
});
