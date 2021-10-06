import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";

const ConfirmModal = (
  {
    isDarkMode,
    showConfirmation,
    message,
    confirmBtnTxt,
    confirmAction,
    confirmColor,
    cancelAction,
  }:
  {
    isDarkMode: boolean | undefined,
    showConfirmation: boolean | undefined,
    message: string,
    confirmBtnTxt: string,
    confirmAction: (() => void),
    confirmColor?: string | undefined,
    cancelAction: (() => void),
  }) => {

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmation}
        onRequestClose={cancelAction}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, isDarkMode ? styles.darkBg : styles.lightBg]}>
            <Text style={styles.modalText}>{message}</Text>

            <View style={styles.buttons}>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonConfirm,
                  {backgroundColor: confirmColor ? confirmColor : "red",}
                ]}
                onPress={confirmAction}
              >
                <Text style={styles.textStyle}>{confirmBtnTxt}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={cancelAction}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
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
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    borderRadius: 3,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonConfirm: {
    marginRight: 10,
  },
  buttonCancel: {
    backgroundColor: "#2196F3",
    marginLeft: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
  },
});

export default ConfirmModal;