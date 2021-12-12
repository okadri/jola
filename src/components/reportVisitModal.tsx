import React from "react";
import { Modal, Pressable, StyleSheet, View, TextInput } from "react-native";
import { Text, themeColor, useTheme } from "react-native-rapi-ui";
import { useDispatch } from "react-redux";
import { supabase } from "../initSupabase";
import { showReportVisitModal } from "../store/contact/actions";
import { selectShowReportModal } from "../store/contact/selectors";

const ReportVisitModal = () => {
  const user = supabase.auth.user()
  const { isDarkmode } = useTheme();
  const dispatch = useDispatch();
  const showReportModal = selectShowReportModal();
  const hideReportVisit = () => dispatch(showReportVisitModal(false));

  const doReportVisit = () => {
    console.log("Visit Reported");
    hideReportVisit();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showReportModal}
      onRequestClose={hideReportVisit}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, isDarkmode ? styles.darkBg : styles.lightBg]}>
          <Text style={styles.reportingAs}>Reporting visit as {user?.email}</Text>
          <TextInput
            multiline
            numberOfLines={4}
            editable
            style={[
              styles.textInput,
              { color: isDarkmode ? themeColor.white100 : themeColor.black100 }
            ]}
          />

          <View style={styles.buttons}>
            <Pressable
              style={[
                styles.button,
                styles.buttonCancel
              ]}
              onPress={hideReportVisit}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                styles.buttonConfirm,
              ]}
              onPress={doReportVisit}
            >
              <Text style={styles.btnText}>Report</Text>
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
    backgroundColor: themeColor.primary,
    marginHorizontal: 5,
  },
  buttonCancel: {
    backgroundColor: themeColor.gray300,
    marginHorizontal: 5,
  },
  btnText: {
    color: themeColor.white,
    fontWeight: "bold",
    textAlign: "center"
  },
  reportingAs: {
    marginBottom: 15,
    color: themeColor.gray300,
  },
  textInput: {
    borderWidth: 1,
    borderColor: themeColor.gray100,
    borderRadius: 5,
  },
});

export default ReportVisitModal;