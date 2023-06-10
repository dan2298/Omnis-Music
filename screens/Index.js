import React from 'react'
import { connect } from 'react-redux'
import { getSongs, getLists, getSpotCategories, getSpotNewReleases } from '../store'
import Navigator from '../Navigator'
import Home from './Home'

import * as RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Index extends React.Component {
    async componentDidMount() {
        const songPath = `${RNFS.DocumentDirectoryPath}/songs`;
        const imagePath = `${RNFS.DocumentDirectoryPath}/images`;
        // Clear songs from device
        // =======================
        // await RNFS.unlink(songPath)
        // await RNFS.unlink(imagePath)
        // await AsyncStorage.clear()
        
        // AsyncStorage.removeItem('categories')
        // AsyncStorage.removeItem('releases')
        if (!await RNFS.exists(songPath)) {
            await RNFS.mkdir(songPath)
            this.forceUpdate()
        }

        if (!await RNFS.exists(imagePath)) {
            await RNFS.mkdir(imagePath)
            this.forceUpdate()
        }

        this.props.getSongs()
        this.props.getLists()
        try {
            const categoriesVal = await AsyncStorage.getItem('categories')
            if (!categoriesVal) {
                this.props.getSpotCategories()
            } else if (categoriesVal) {
                const date = JSON.parse(categoriesVal).date
                if(Math.abs(new Date() - new Date(date)) > 28800000) {
                    await AsyncStorage.removeItem('categories')
                    this.props.getSpotCategories()
                }
            }
            const releasesVal = await AsyncStorage.getItem('releases')
            if (!releasesVal) {
                this.props.getSpotNewReleases()
            } else if (releasesVal) {
                const date = JSON.parse(releasesVal).date
                if(Math.abs(new Date() - new Date(date)) > 28800000) {
                    await AsyncStorage.removeItem('releases')
                    this.props.getSpotCategories()
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <Navigator></Navigator>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSongs: () => dispatch(getSongs()),
        getLists: () => dispatch(getLists()),
        getSpotCategories: () => dispatch(getSpotCategories()),
        getSpotNewReleases: () => dispatch(getSpotNewReleases())
    }
}

export default connect(null, mapDispatchToProps)(Index);