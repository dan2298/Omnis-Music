import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles'
import Header from '../components/Header'
import * as FileSystem from 'expo-file-system';
import { ScrollView } from 'react-native-gesture-handler';

export default class Downloads extends React.Component {
    constructor() {
        super()
        this.state = {
            songs: []
        }
    }

    componentDidMount() {
        this.mkdir()
        this.getSongs()
    }

    async mkdir() {
        const { exists } = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}songs`)
        if (!exists) {
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}songs`)
        }
    }

    async getSongs() {
        const songs = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}songs`)
        this.setState({ songs })
    }

    render() {
        console.log(this.state)
        return (
            <View style={styles}>
                <Header title={'Downloads'}></Header>
                <ScrollView>
                    {this.state.songs.map((song, idx) => <Text key={idx} style={{ color: 'white' }}>{song}</Text>)}
                </ScrollView>
            </View>
        )
    }
}