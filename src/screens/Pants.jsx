import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import GetMeData from "../service/GetMeData";
import { Button } from "react-native-paper";
import { set_remembered_sets, set_start_time, set_endtime } from "../../redux/store";
import Search from "./Search";
import useTimeStamp from "../hooks/useTimeStamp";

const Pants = ({ navigation }) => {
  const memoizedState = useSelector((state) => state.myStateIsRemembered),
    [focus, setFocused] = useState(false),
    { rememberMyPants, rememberMyShoes, rememberMyShirts, rememberMySets } =
      memoizedState,
    newData = [rememberMyPants, rememberMyShoes, rememberMyShirts],
    dispatch = useDispatch();
  navigation.addListener('focus', () => {
    setFocused(!focus)
  });

  useEffect(() => { dispatch(set_start_time(useTimeStamp())) }, [focus])

  const FinishChoosing = async () => {
    if (typeof newData !== "undefined" && newData.length > 0) {
      dispatch(set_remembered_sets(rememberMySets.concat(newData)));
      dispatch(set_endtime(useTimeStamp()))
      navigation.navigate("Dress Me");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Search />
      <GetMeData type={"pants"} />
      {/* <Button style={styles.btnsLong} mode="contained" onPress={FinishChoosing}>
        Continue
      </Button> */}
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
