import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, themeColor, useTheme } from 'react-native-rapi-ui';

const ContactSectionHeader = ({ title, icon }: { title: string, icon: any }) => {
  const { isDarkmode } = useTheme();

  return (
    <View style={styles.sectionHeader}>
      <Ionicons
        name={icon}
        size={20}
        color={isDarkmode
          ? themeColor.white
          : themeColor.dark100}
        style={styles.headerIcon}
      />
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    backgroundColor: themeColor.primaryTransparent100,
    borderBottomColor: themeColor.primaryTransparent300,
    borderBottomWidth: 2,
  },
  headerIcon: {
    marginRight: 5,
  },
});

export default ContactSectionHeader;