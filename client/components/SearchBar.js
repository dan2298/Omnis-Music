import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchBar = props => {
    return (
        <View style={styles.searchBarContainer}>
            <TextInput
                placeholder="Search"
                placeholderTextColor='#b8bece'
                style={styles.searchBar}
                onSubmitEditing={props.search}
                onChangeText={props.searchInputHandler}
            >
            </TextInput>
            <TouchableOpacity onPress={props.search}>
                <Ionicons name='ios-search' size={24} color='#b8bece' style={{ padding: 4 }}></Ionicons>
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    searchBarContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 45,
        marginLeft: 12,
        marginBottom: 6,
        padding: 3,
        width: '92%',
        backgroundColor: '#444',
        flexDirection: 'row',
        borderRadius: 12,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        justifyContent: "space-around"
    },
    searchBar: {
        height: 36,
        width: '87%',
        color: 'white',
    }
})