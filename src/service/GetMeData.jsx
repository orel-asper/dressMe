import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { ProgressBar, Colors } from "react-native-paper";
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

  // function filterByValue(array, string) {
  //   if ((!shoes.length && shoes == undefined) || searchStore == '') return;
  //   return array.filter(o =>
  //     Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
  // }

  function filterByValue(array, string) {
    return array.filter(o => {
      return Object.keys(o).some(k => {
        if (typeof o[k] === 'string')
          return o[k].toLowerCase().includes(string.toLowerCase());
      });
    });
  }

  let data = [{ "brand": "adidas", "colors": ["green", "blue", "pink"], "id": 223, "name": "s_a", "sizes": [30, 32, 33, 37], "type": "shoes" }, { "brand": "abcds", "colors": ["black", "white", "green"], "id": 543, "name": "s_ads", "sizes": [31, 30, 38, 37], "type": "shoes" }, { "brand": "asabc", "colors": ["orange", "blue", "pink", "#911"], "id": 411, "name": "s_a", "sizes": [30, 37], "type": "shoes" }, { "brand": "nike", "colors": ["yellow", "black", "gray", "#246"], "id": 994, "name": "s_adds", "sizes": [30, 35, 33, 37], "type": "shoes" }, { "brand": "adidas", "colors": ["#944", "pink", "red"], "id": 4576, "name": "s_sho", "sizes": [28, 29, 33, 34, 35, 40, 42, 43], "type": "shoes" }, { "brand": "nike", "colors": ["white", "gray", "black", "pink"], "id": 876, "name": "s_dwsa", "sizes": [34, 31, 33, 40, 35, 32], "type": "shoes" }, { "brand": "timberland", "colors": ["blue", "yellow", "black", "pink"], "id": 176, "name": "s_dwsa", "sizes": [39, 36, 33, 40, 35, 32], "type": "shoes" }]
  // console.log(filterByValue(shoes, searchStore))
  console.log(filterByValue(data, searchStore))


  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ProgressBar progress={1} color={Colors.red800} />
      ) : (
        <>
          <FlatList
            data={typeChanger(type)}
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
