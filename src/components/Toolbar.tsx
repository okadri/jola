import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { TextInput } from "react-native-rapi-ui";
import { selectSearchCriteria } from "../store/contact/selectors";
import { setSearchCriteria } from "../store/contact/actions";
import { Ionicons } from "@expo/vector-icons";

const Toolbar = ({ isDarkMode }: { isDarkMode: boolean | undefined }) => {
    const dispatch = useDispatch();
    const searchCriteria = selectSearchCriteria();

    const handleSearch = (criteria : string) => dispatch(setSearchCriteria(criteria));
    const clearCriteria = () => dispatch(setSearchCriteria(""));

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search Contacts"
                value={searchCriteria}
                onChangeText={(val) => handleSearch(val)}
                rightContent={
                    <Ionicons
                        name={searchCriteria ? "close" : "search"}
                        size={20}
                        color='#999'
                        onPress={clearCriteria}
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        marginBottom: 10,
    }
});

export default Toolbar;