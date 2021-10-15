import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { TextInput } from "react-native-rapi-ui";
import { selectSearchCriteria } from "../store/contact/selectors";
import { setSearchCriteria, setShowOptions } from "../store/contact/actions";
import { Ionicons } from "@expo/vector-icons";

const Toolbar = () => {
    const dispatch = useDispatch();
    const searchCriteria = selectSearchCriteria();

    const handleSearch = (criteria : string) => dispatch(setSearchCriteria(criteria));
    const clearCriteria = () => dispatch(setSearchCriteria(""));
    const showOptions = () => dispatch(setShowOptions(true));

    return (
        <View style={styles.container}>
            <View style={styles.searchInput}>
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
            <View style={styles.toolIcons}>
                <Ionicons
                    name="options"
                    size={20}
                    color='#999'
                    onPress={showOptions}
                    style={styles.toolIcon}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        
    },
    searchInput: {
        flex: 9,
    },
    toolIcons: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    toolIcon: {
        marginRight: 5,
    },
});

export default Toolbar;