import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { ProgressBar, Colors, Title } from "react-native-paper";
import { useSelector } from "react-redux";
import Items from "../screens/Items";

export default GetMeData = ({ type }) => {
  const [isLoading, setLoading] = useState(true),
    [shoes, setShoes] = useState([]),
    [pants, setPants] = useState([]),
    [shirts, setShirts] = useState([]),
    url = `http://www.mocky.io/v2/5e3940013200005e00ddf87e?mocky-delay=600ms`,
    searchStore = useSelector((state) => state.normalState.search);

  const getData = async () => {
      try {
        const response = await fetch(url),
          data = await response.json();
        data.results.map((d) => {
          switch (d.type) {
            case "shoes":
              setShoes((shoes) => [...shoes, d]);
              break;
            case "pants":
              setPants((pants) => [...pants, d]);
              break;
            case "shirt":
              setShirts((shirts) => [...shirts, d]);
              break;
            default:
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    typeChanger = (type) => {
      switch (type) {
        case "shoes":
          return shoes;
        case "pants":
          return pants;
        case "shirts":
          return shirts;
        default:
          return;
      }
    };

  useEffect(() => {
    if (shoes.length || pants.length || shirts.length) return;
    getData();
  }, []);

  function filterByValue(array, string) {
    return array.filter((o) => {
      return Object.keys(o).some((k) => {
        if (typeof o[k] === "string")
          return o[k].toLowerCase().includes(string.toLowerCase());
      });
    });
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ProgressBar progress={1} color={Colors.red800} />
      ) : (
        <>
          <Title> Found {typeChanger(type).length} Items</Title>
          <FlatList
            data={filterByValue(typeChanger(type), searchStore)}
            keyExtractor={({ id }, index) => (id + index).toString()}
            renderItem={({ item }) => <Items itm={item} />}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
