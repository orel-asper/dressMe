import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, Paragraph } from "react-native-paper";
import { set_clear_remembered, set_show_finished_btn } from "../../redux/store";

const Home = React.memo(({ navigation }) => {
  const memoizedState = useSelector((state) => state.myStateIsRemembered),
    showBtn = useSelector((state) => state.normalState.showBtn),
    nav = useSelector((state) => state.normalState.navigate),
    allData = memoizedState.rememberMySets,
    { rememberMyPants, rememberMyShoes, rememberMyShirts } = memoizedState,
    dispatch = useDispatch();

  // useEffect(() => {
  //   if (!nav) return;
  //   navigation.navigate(nav);
  // }, [nav]);

  const finishedBtn = () => {
    dispatch(set_clear_remembered([]));
    navigation.navigate(" ");
  };

  useEffect(() => {
    if (
      rememberMyPants.brand != undefined &&
      rememberMyShoes.brand != undefined &&
      rememberMyShirts.brand != undefined
    ) {
      dispatch(set_show_finished_btn(true));
    } else dispatch(set_show_finished_btn(false));
  }, [memoizedState]);

  const myStatus = () => {
    let num = 0,
      finished = "";
    if (rememberMyPants.brand != undefined) {
      (num += 1), (finished += "Pants , ");
    }
    if (rememberMyShoes.brand != undefined) {
      (num += 1), (finished += "Shoes , ");
    }
    if (rememberMyShirts.brand != undefined) {
      (num += 1), (finished += "Shirt , ");
    }

    return `FINISHED: ${num} ITEMS:  ${finished}`;
  };

  return (
    <View style={styles.container}>
      <Paragraph>Completed Sets {allData.length / 3}</Paragraph>
      <Paragraph>Status:{myStatus()} </Paragraph>

      {showBtn ? (
        <Button style={styles.btnsLong} mode="contained" onPress={finishedBtn}>
          finish
        </Button>
      ) : null}
      <View style={[styles.container, { flexDirection: "column-reverse" }]}>
        <Button
          style={styles.btnsLong}
          mode="contained"
          onPress={() => navigation.navigate("Shoes")}
        >
          go to Shoes
        </Button>
        <Button
          style={styles.btnsLong}
          mode="contained"
          onPress={() => navigation.navigate("Pants")}
        >
          go to Pants
        </Button>
        <Button
          style={styles.btnsLong}
          mode="contained"
          onPress={() => navigation.navigate("Shirt")}
        >
          go to Shirt
        </Button>
      </View>
    </View>
  );
});

export default Home;

const styles = StyleSheet.create({
  flexView: {
    flexDirection: "row",
    width: "40%",
  },
  viewColor: {
    left: 10,
    padding: 5,
    margin: 5,
    borderRadius: 13,
    borderColor: "black",
  },
  btns: {
    margin: 5,
    justifyContent: "center",
    alignSelf: "center",
    width: "30%",
    height: "6%",
  },
  btnsLong: {
    margin: 5,
    justifyContent: "center",
    alignSelf: "center",
    width: "70%",
    height: "6%",
  },
  cards: {
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
