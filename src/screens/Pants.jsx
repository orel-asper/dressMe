import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import GetMeData from "../service/GetMeData";
import { set_start_time } from "../../redux/store";
import Search from "./Search";
import useTimeStamp from "../hooks/useTimeStamp";

const Pants = ({ navigation }) => {
  const [focus, setFocused] = useState(false),
    dispatch = useDispatch();

  navigation.addListener("focus", () => {
    setFocused(!focus);
  });

  useEffect(() => {
    dispatch(set_start_time(useTimeStamp()));
  }, [focus]);

  return (
    <View style={{ flex: 1 }}>
      <Search />
      <GetMeData type={"pants"} />
    </View>
  );
};

export default Pants;
