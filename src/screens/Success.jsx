import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Share } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, DataTable, Paragraph, Text } from "react-native-paper";
import { set_clear_all } from "../../redux/store";

const Items = ({ itm }) => {
  const { brand, colors, id, name, sizes, type, rndImg, startTime } = itm,
    endTime = useSelector((state) => state.normalState.endTime);

  let hours = endTime.hours - startTime.hours,
    minutes = endTime.minutes - startTime.minutes,
    seconds = endTime.seconds - startTime.seconds;

  return (
    <>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>{brand}</DataTable.Cell>
          <DataTable.Cell>{type}</DataTable.Cell>
          <DataTable.Cell>{sizes}</DataTable.Cell>
          <DataTable.Cell>{colors}</DataTable.Cell>
          <DataTable.Title>{`${hours}:${minutes}:${seconds} `}</DataTable.Title>
        </DataTable.Row>
      </DataTable>
    </>
  );
};

// {allData.length / 3 ? (
//   <View style={{ borderBottomColor: "black", borderWidth: 1 }} />
// ) : null
// }

const Success = React.memo(({ navigation }) => {
  const memoizedState = useSelector((state) => state.myStateIsRemembered),
    nav = useSelector((state) => state.normalState.navigate),
    allData = memoizedState.rememberMySets,
    dispatch = useDispatch();

  const onSharePress = async () => {
    let data = allData.map(
      (d) =>
        ` ${d.brand}, ${d.colors}, ${d.id}, ${d.name}, ${d.sizes}, ${d.type}, ${d.rndImg}`
    );
    Share.share({
      title: "youre stuff from Dress Me",
      message: data.join("\n"),
    });
  };

  useEffect(() => {
    if (!nav) return;
    navigation.navigate(nav);
  }, [nav]);

  return (
    <View style={styles.container}>
      <Button
        style={styles.btnsLong}
        mode="contained"
        onPress={() => navigation.navigate("Dress Me")}
      >
        go back to home
      </Button>
      <Text style={{ fontSize: 18, paddingHorizontal: 15 }}>
        Yayyy... youve finished a set congratulations!{" "}
      </Text>
      <Card.Title title="latest items" />
      <DataTable.Header>
        <DataTable.Title>Brand</DataTable.Title>
        <DataTable.Title>Type</DataTable.Title>
        <DataTable.Title>Size</DataTable.Title>
        <DataTable.Title>Color</DataTable.Title>
        <DataTable.Title>time</DataTable.Title>
      </DataTable.Header>
      {allData.length ? (
        <View style={{ width: "100%", height: "65%" }}>
          <FlatList
            data={allData}
            keyExtractor={({ id }, index) => Math.random(id + index).toString()}
            renderItem={({ item }) => <Items itm={item} />}
          />
          <Button style={styles.btns} mode="contained" onPress={onSharePress}>
            Share
          </Button>
        </View>
      ) : null}
      <Button
        style={[styles.btnsLong, { backgroundColor: "red" }]}
        mode="contained"
        onPress={() => dispatch(set_clear_all([]))}
      >
        clear data
      </Button>
    </View>
  );
});

export default Success;

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
    margin: 20,
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
