import React from 'react';
import { View, TextInput, Text, StyleSheet, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchBar = props => {    
    return (
        <View style={styles.container}>
            <View style={props.input || props.searched ? styles.searchBarAfterContainer : styles.searchBarContainer}>
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
                        props.softClear()
                    }}>
                        <Ionicons name='ios-close' size={28} color='#b8bece' style={{ padding: 2, paddingBottom: 0 }}></Ionicons>
                    </TouchableOpacity> :
                    <View style={{ paddingLeft: 16, padding: 2, paddingBottom: 3 }}></View>
                }
            </View> 
            {props.input || props.searched ?
                <TouchableOpacity onPress={() => {
                    this.textInput.clear()
                    props.clear()
                    Keyboard.dismiss()
                }}>
                    <Text style={{color:'white', fontSize: 15, paddingTop: 40, marginLeft: '14%', fontWeight: '600'}}>Cancel</Text>
                </TouchableOpacity> :
                <View></View>
            }
        </View>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        height: '14.5%',
        backgroundColor: "rgb(40,40,40)",
        borderBottomColor: "rgb(60,60,60)",
        borderBottomWidth: .5
    },
    searchBarContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        marginLeft: 12,
        marginBottom: 6,
        padding: 3,
        width: '94%',
        backgroundColor: '#444',
        flexDirection: 'row',
        borderRadius: 12,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        justifyContent: "space-around"
    },
    searchBarAfterContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        marginLeft: 12,
        marginBottom: 6,
        padding: 3,
        width: "78%",
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