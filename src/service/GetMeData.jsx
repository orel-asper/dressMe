import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { ProgressBar, Colors } from "react-native-paper";
import Items from "../screens/Items";

export default GetMeData = ({ type }) => {
  const [isLoading, setLoading] = useState(true),
    [shoes, setShoes] = useState([]),
    [pants, setPants] = useState([]),
    [shirts, setShirts] = useState([]),
    url = `http://www.mocky.io/v2/5e3940013200005e00ddf87e?mocky-delay=600ms`;

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

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ProgressBar progress={0.5} color={Colors.red800} />
      ) : (
        <>
          <FlatList
            data={typeChanger(type)}
            keyExtractor={({ id }, index) => id.toString() + index}
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
