import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default GetMeData = ({ type }) => {
  const [isLoading, setLoading] = useState(true),
    [shoes, setShoes] = useState([]),
    [pants, setPants] = useState([]),
    [shirts, setShirts] = useState([]),
    url = `http://www.mocky.io/v2/5e3940013200005e00ddf87e?mocky-delay=600ms`

  const getData = async () => {
    try {
      const response = await fetch(url),
        data = await response.json();
      data.results.map((d) => {
        switch (d.type) {
          case 'shoes':
            setShoes(shoes => [...shoes, d])
            break;
          case 'pants':
            setPants(pants => [...pants, d])
            break;
          case 'shirt':
            setShirts(shirts => [...shirts, d])
            break;
          default:
        }
      })
      console.log(data.results[0].type)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  },

    typeChanger = (type) => {
      switch (type) {
        case 'shoes':
          return shoes
        case 'pants':
          return pants
        case 'shirts':
          return shirts
        default: return
      }
    }

  useEffect(() => {
    getData();
  }, []);


  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator /> : (
        <>
          <FlatList
            data={typeChanger(type)}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => (
              <Text>{item.name}</Text>
            )}
          />
        </>
      )}
    </View>
  );
};