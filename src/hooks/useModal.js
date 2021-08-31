import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Modal, Portal, Text, Button, RadioButton } from "react-native-paper";
import { set_selected_size } from "../../redux/store";

const GetModal = ({ visible, hideModal, sizes, AddData }) => {
  const [checked, setChecked] = useState(),
    [S, setS] = useState(""),
    containerStyle = { backgroundColor: "white", padding: 20 },
    dispatch = useDispatch(),
    onSelect = () => {
      hideModal();
      setChecked();
    };

  useEffect(() => {
    dispatch(set_selected_size(S));
  }, [S]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text>CHOOSE SIZE</Text>
        <View style={styles.flexView}>
          {sizes.map((size, i) => (
            <View key={size}>
              <Text>{size}</Text>
              <RadioButton
                value={i}
                status={checked === i ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(i);
                  setS(size);
                }}
              />
            </View>
          ))}
        </View>
        <Button style={styles.btns} mode="contained" onPress={() => onSelect()}>
          close
        </Button>
        <Button
          style={styles.btns}
          mode="contained"
          onPress={() => {
            onSelect();
            AddData();
          }}
        >
          Add
        </Button>
      </Modal>
    </Portal>
  );
};

export default GetModal;

const styles = StyleSheet.create({
  flexView: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    // width: "40%",
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
});
