import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { selectShowOptions, selectSortBy } from "../store/contact/selectors";
import { setShowOptions, setSortBy, SortByOptions } from "../store/contact/actions";
import { RadioButton, Text, themeColor, useTheme } from "react-native-rapi-ui";

const OptionsModal = () => {
  const dispatch = useDispatch();
  const showOptions = selectShowOptions();
  const sortBy = selectSortBy();
  const { isDarkmode } = useTheme();

  const hideOptions = () => dispatch(setShowOptions(false));

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showOptions}
      onRequestClose={hideOptions}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, isDarkmode ? styles.darkBg : styles.lightBg]}>
          <Text style={styles.modalText}>Sorting</Text>

          {Object.values(SortByOptions).map(sortOption =>
            <View style={styles.radio} key={sortOption}>
              <RadioButton
                value={sortBy == sortOption}
                onValueChange={() => dispatch(setSortBy(sortOption))} />
              <Text size="md" style={styles.radioText}>
                {sortOption}
              </Text>
            </View>
          )}


          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={hideOptions}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>);
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 25,
    borderRadius: 20,
    padding: 35,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5,
  },
  lightBg: {
    backgroundColor: themeColor.white,
    shadowColor: themeColor.black,
  },
  darkBg: {
    backgroundColor: themeColor.dark100,
    shadowColor: themeColor.gray100,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "flex-start",
    textAlign: "left",
    marginBottom: 5,
  },
  radioText: {
    marginLeft: 10,
  },
});

export default OptionsModal;