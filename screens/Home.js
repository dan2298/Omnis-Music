import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import SongBar from '../components/SongBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Category from '../components/Category'
import Ionicons from 'react-native-vector-icons/Ionicons';

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            categories: [],
            releases: []
        }
    }

    async componentDidMount() {
        try {
            const categoriesVal = await AsyncStorage.getItem('categories')
            categoriesVal ? this.setState({ categories: JSON.parse(categoriesVal).categories }) : this.setState({ categories: this.props.categories.genres })

            const releasesVal = await AsyncStorage.getItem('releases')
            releasesVal ? this.setState({ releases: JSON.parse(releasesVal).releases }) :this.setState({ releases: this.props.categories.releases })        
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { navigate } = this.props.navigation
        const categories = this.state.categories.length ? this.state.categories : this.props.categories.genres
        const releases = this.state.releases.length ? this.state.releases : this.props.categories.releases
        return (
            <LinearGradient start={{x: -1, y: -1.5 }} end={{x: 1, y: 0.5 }} style={{height:'100%', width: '100%'}} colors={['rgb(60, 60, 60)', 'rgb(20,20,20)']}>
                <ScrollView>
                    <View style={styles.topHeader}>
                        <Text style={styles.topText}>Browse</Text>
                        <TouchableOpacity onPress={() => navigate('Settings')}>
                            <Ionicons name={'ios-settings'} size={24} style={{margin: '1.5%', marginTop: '50%'}} color={'rgb(150,150,150)'}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>                    
                    {categories.map((el, idx) => (<Category key={idx} item={el}></Category>))}
                    </ScrollView>
                    
                <Text style={styles.middleText}>New Releases</Text>
                <View style={{ alignItems: "center", height: 200}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>                    
                    {releases.map((el, idx) => (<Category key={idx} item={el}></Category>))}
                    </ScrollView>            
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.chartsText}>Charts</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: '10%'}}>
                        <TouchableOpacity style={{ flexDirection:'column' }}>
                            <Image style={{height: 150, width: 150}} source={{ uri:'https://charts-images.scdn.co/REGIONAL_US_LARGE.jpg' }}></Image>
                            <Text style={styles.chartsTitle}>United States Top 50</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection:'column' }}>
                            <Image style={{height: 150, width: 150}} source={{ uri:'https://charts-images.scdn.co/REGIONAL_GLOBAL_LARGE.jpg' }}></Image>
                            <Text style={styles.chartsTitle}>Global Top 50</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                <TouchableOpacity onPress={() => navigate('Song', {seek: this.seek})}>
                    <SongBar navigate={navigate}></SongBar>
                </TouchableOpacity>
            </LinearGradient>
        )
    }

}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSongs: () => dispatch(getSongs()),
        setSong: (index) => dispatch(setSong(index)),
        playNextSong: () => dispatch(playNextSong()),
        updateDuration: (data) => dispatch(updateDuration(data)),
        updatePlayTime: (time) => dispatch(updatePlayTime(time)),
        seeked: () => dispatch(seeked()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    topHeader: {
        flex:1, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '18%', 
    },
    topText: {
        color: 'rgb(220,220,220)',
        fontSize: 30, 
        fontFamily: 'Baskerville',
        fontWeight: '600', 
        margin: '3%',
        marginLeft: '3.5%'
    },
    middleText: {
        margin: 5, 
        color:'rgb(220,220,220)', 
        fontWeight: '600',
        fontFamily: 'Baskerville',
        fontSize: 28, 
        paddingTop: 10,
        paddingLeft: 2,
        margin: '3%',
        marginLeft: '3.5%'
    },
    chartsText: {
        margin: 5, 
        color:'rgb(220,220,220)', 
        fontWeight: '600',
        fontFamily: 'Baskerville',
        fontSize: 28,
        marginBottom: '3%', 
        textAlign: "center"
    },
    chartsTitle: {
        color: 'white',
        margin: 4,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500'
    }
})