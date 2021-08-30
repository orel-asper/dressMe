import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  DataTable,
  Paragraph,
} from "react-native-paper";
import UseImage from "../hooks/useImage";
import { set_clear_all } from "../../redux/store";

const Items = ({ itm }) => {
  const { brand, colors, id, name, sizes, type, rndImg } = itm;
  return (
    <>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>{brand}</DataTable.Cell>
          <DataTable.Cell>{name}</DataTable.Cell>
          <DataTable.Cell>{sizes}</DataTable.Cell>
          <DataTable.Cell>{colors}</DataTable.Cell>
          <DataTable.Cell>{rndImg}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </>
  );
};

// {allData.length / 3 ? (
//   <View style={{ borderBottomColor: "black", borderWidth: 1 }} />
// ) : null
// }

const Home = React.memo(({ navigation }) => {
  const memoizedState = useSelector((state) => state.myStateIsRemembered),
    nav = useSelector((state) => state.normalState.navigate),
    allData = memoizedState.rememberMySets,
    dispatch = useDispatch();

  useEffect(() => {
    if (!nav) return;
    navigation.navigate(nav);
  }, [nav]);

  return (
    <View style={styles.container}>
      <Button
        style={styles.btnsLong}
        mode="contained"
        onPress={() => navigation.navigate("Shirt")}
      >
        start building your outfit
      </Button>
      <Paragraph>Completed Sets {allData.length / 3}</Paragraph>
      <Paragraph>Status: </Paragraph>
      <Card.Title title="latest items" />
      <DataTable.Header>
        <DataTable.Title>Brand</DataTable.Title>
        <DataTable.Title>Type</DataTable.Title>
        <DataTable.Title>Size</DataTable.Title>
        <DataTable.Title>Color</DataTable.Title>
        <DataTable.Title>Time</DataTable.Title>
      </DataTable.Header>
      {allData.length ? (
        <View style={{ width: "100%", height: "65%" }}>
          <FlatList
            data={allData}
            keyExtractor={({ id }, index) => id + Math.random(index)}
            renderItem={({ item }) => <Items itm={item} />}
          />
          <Button style={styles.btns} mode="contained" onPress={() => { }}>
            Share
          </Button>
        </View>
      ) : null}
      <Button
        style={styles.btnsLong}
        mode="contained"
        onPress={() => dispatch(set_clear_all([]))}
      >
        clear data
      </Button>
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
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
