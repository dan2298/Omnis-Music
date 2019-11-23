import React from 'react';
import { View, TextInput, Button } from 'react-native';
import styles from '../../styles'

const SearchBar = props => {
    return (
        <View style={styles.searchBarContainer}>
            <TextInput
                placeholder="Search"
                style={styles.searchBar}
                onChangeText={props.searchInputHandler}
            >
            </TextInput>
            <Button title="Search" onPress={props.apiWorking}></Button>
        </View>
    )
}

export default SearchBar;