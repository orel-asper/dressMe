import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Badge, List } from "react-native-paper";
import UseImage from "../hooks/useImage";
import { set_clear_all } from "../../redux/store";

const Items = ({ itm }) => {
  const { brand, colors, id, name, sizes, type, rndImg } = itm;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Card style={styles.cards}>
            <Card.Title title={brand} subtitle={name} />
            <Card.Content></Card.Content>
            <UseImage type={rndImg} />
            <View style={styles.flexView}>
              <View style={styles.viewColor}>
                <Badge style={{ backgroundColor: colors }}></Badge>
              </View>
            </View>
            <Card.Actions></Card.Actions>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const Home = React.memo(({ navigation }) => {
  const memoizedState = useSelector((state) => state.myStateIsRemembered),
    nav = useSelector((state) => state.normalState.navigate),
    allData = memoizedState.rememberMySets,
    dispatch = useDispatch();

  // console.log(memoizedState);

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
      <Card.Title title="latest items" />
      <ScrollView style={{ width: "100%", height: "90%" }}>
        <List.Section title="your sets">
          {allData.length ? (
            <List.Accordion
              title="set"
              left={(props) => <List.Icon {...props} icon="folder" />}
            >
              <View style={{ width: "100%", height: "78%" }}>
                <FlatList
                  data={allData}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => <Items itm={item} />}
                />
                <Button style={styles.btns} mode="contained" onPress={() => {}}>
                  Share
                </Button>
              </View>
            </List.Accordion>
          ) : null}
        </List.Section>
      </ScrollView>
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
