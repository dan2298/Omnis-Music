import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchBar = props => {
    return (
        <View style={styles.searchBarContainer}>
            <TouchableOpacity onPress={props.search}>
                <Ionicons name='ios-search' size={24} color='#b8bece' style={{ padding: 4 }}></Ionicons>
            </TouchableOpacity>
            <TextInput
                placeholder="Search"
                placeholderTextColor='#b8bece'
                style={styles.searchBar}
                onSubmitEditing={props.search}
                onChangeText={props.searchInputHandler}
                ref={input => { this.textInput = input }}
            >
            </TextInput>
            {props.input ?
                <TouchableOpacity style={{ padding: 2 }} onPress={() => {
                    this.textInput.clear()
                    props.clear()
                }}>
                    <Ionicons name='ios-close' size={28} color='#b8bece' style={{ padding: 2, paddingBottom: 0 }}></Ionicons>
                </TouchableOpacity> :
                <View style={{ paddingLeft: 16, padding: 2, paddingBottom: 3 }}></View>
            }
        </View>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    searchBarContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 45,
        marginLeft: 12,
        marginBottom: 6,
        padding: 3,
        width: '93%',
        backgroundColor: '#444',
        flexDirection: 'row',
        borderRadius: 12,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        justifyContent: "space-around"
    },
    searchBar: {
        height: 36,
        width: '80%',
        fontSize: 16,
        color: 'white',
    }
})