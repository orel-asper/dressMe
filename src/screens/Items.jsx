import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Badge } from "react-native-paper";
import UseImage from "../hooks/useImage";
import GetModal from "../hooks/useModal";
import {
  set_navigation,
  set_remembered_pants,
  set_remembered_shirts,
  set_remembered_shoes,
  set_endtime
} from "../../redux/store";

const RandomImg = (type) => {
  let RN = Math.floor(Math.random() * 3) + 1;
  switch (type) {
    case "shoes":
      return `SH${RN}`;
    case "pants":
      return `P${RN}`;
    case "shirt":
      return `S${RN}`;
    default:
      return;
  }
};

const dispatchType = (type, body) => {
  switch (type) {
    case "shirt":
      return set_remembered_shirts(body);
    case "pants":
      return set_remembered_pants(body);
    case "shoes":
      return set_remembered_shoes(body);
    default:
      return;
  }
};

const navigateType = (type) => {
  switch (type) {
    case "shirt":
      return "Pants";
    case "pants":
      return "Shoes";
    case "shoes":
      return "Dress Me";
    default:
      return;
  }
};

export default Items = ({ itm }) => {
  const { brand, colors, id, name, sizes, type } = itm,
    memoizedState = useSelector((state) => state.myStateIsRemembered),
    selectedSize = useSelector((state) => state.normalState.selectedSize),
    startTime = useSelector((state) => state.normalState.startTime),
    endTime = useSelector((state) => state.normalState.endTime),
    [selectedColor, setSelectedColor] = useState(""),
    [visible, setVisible] = useState(false),
    [rndImg, setRndImg] = useState(),
    showModal = () => setVisible(true),
    hideModal = () => setVisible(false),
    dispatch = useDispatch(),
    AddData = () => {
      if (
        !selectedColor ||
        !rndImg ||
        !id ||
        !brand ||
        !name ||
        !selectedSize
      ) {
        Alert.alert("Ops.. you missed some part please choose the missing");
        return;
      } else {
        const body = {
          brand,
          colors: selectedColor,
          id,
          name,
          sizes: selectedSize,
          rndImg,
          type,
          startTime,
          endTime,
        };
        dispatch(dispatchType(type, body));
        dispatch(set_navigation(navigateType(type)));
        navigateType(type) === 'Dress Me' && dispatch(set_endtime(useTimeStamp()));
        setSelectedColor("");
      }
    }

  useEffect(() => {
    setRndImg(RandomImg(type));
  }, []);

  return (
    <>
      <GetModal visible={visible} hideModal={hideModal} sizes={sizes} AddData={AddData} />
      <Card style={styles.cards}>
        <Card.Title title={brand.toUpperCase()} subtitle={name.toUpperCase()} />
        <Card.Content></Card.Content>
        <UseImage type={rndImg} />
        <View style={styles.flexView}>
          {colors.map((color, i) => (
            <TouchableOpacity
              key={color + Math.random() * 10}
              onPress={() => setSelectedColor(color)}
              style={[
                styles.ToucOpacityColor,
                { borderWidth: selectedColor === color ? 1 : null },
              ]}
            >
              <Badge style={{ backgroundColor: color }}></Badge>
            </TouchableOpacity>
          ))}
        </View>
        <Card.Actions>
          <Button
            style={styles.btns}
            mode="contained"
            onPress={() => AddData()}
          >
            Add
          </Button>
          <Button
            style={styles.btns}
            mode="contained"
            onPress={() => showModal(true)}
          >
            Size
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  flexView: {
    flexDirection: "row",
    width: "40%",
  },
  ToucOpacityColor: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 5,
    margin: 5,
    borderRadius: 13,
    borderColor: "black",
  },
  btns: {
    margin: 5,
  },
  cards: {
    marginBottom: 10,
  },
});
